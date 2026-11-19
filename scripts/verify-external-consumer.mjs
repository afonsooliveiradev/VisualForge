import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const libraryDir = join(repoRoot, "packages", "react");
const exampleDir = join(repoRoot, "examples", "external-consumer");

const npmCli = process.env.npm_execpath;

if (!npmCli) {
  throw new Error("Execute a verificacao atraves de npm exec ou npm run.");
}

function runNpm(args, cwd) {
  console.log(`\n> npm ${args.join(" ")}`);

  const result = spawnSync(process.execPath, [npmCli, ...args], {
    cwd,
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Comando npm falhou: ${args.join(" ")}`);
  }
}

function assertExists(path, description) {
  if (!existsSync(path)) {
    throw new Error(`${description} nao encontrado: ${path}`);
  }
}

console.log("===== VISUALFORGE - EXTERNAL CONSUMER VERIFICATION =====");

assertExists(join(libraryDir, "package.json"), "Biblioteca");
assertExists(join(exampleDir, "package.json"), "Consumidor");
assertExists(join(exampleDir, "package-lock.json"), "Lockfile");

const tempRoot = mkdtempSync(join(tmpdir(), "visualforge-consumer-"));
const consumerDir = join(tempRoot, "consumer");

try {
  console.log("\n===== PREPARANDO AMBIENTE ISOLADO =====");

  cpSync(exampleDir, consumerDir, {
    recursive: true,
    filter: (source) => {
      const relative = source.slice(exampleDir.length);
      const parts = relative.split(/[\\/]/).filter(Boolean);

      return !parts.some((part) =>
        ["node_modules", "dist", "tsconfig.tsbuildinfo"].includes(part)
      );
    },
  });

  assertExists(join(consumerDir, "package-lock.json"), "Lockfile copiado");

  console.log("\n===== COMPILANDO BIBLIOTECA =====");

  runNpm(["run", "build", "-w", "@visualforge/react"], repoRoot);

  console.log("\n===== GERANDO PACOTE NPM =====");

  runNpm(
    ["pack", "--pack-destination", tempRoot],
    libraryDir
  );

  const tarballs = readdirSync(tempRoot).filter((name) =>
    name.endsWith(".tgz")
  );

  if (tarballs.length !== 1) {
    throw new Error("Esperado exatamente um pacote .tgz.");
  }

  const tarball = join(tempRoot, tarballs[0]);

  console.log("\n===== INSTALANDO DEPENDENCIAS EXTERNAS =====");

  runNpm(
    ["ci", "--workspaces=false", "--no-audit", "--no-fund"],
    consumerDir
  );

  console.log("\n===== INSTALANDO VISUALFORGE =====");

  runNpm(
    [
      "install",
      tarball,
      "--no-save",
      "--package-lock=false",
      "--workspaces=false",
      "--no-audit",
      "--no-fund",
    ],
    consumerDir
  );

  const installedLibrary = join(
    consumerDir,
    "node_modules",
    "@visualforge",
    "react"
  );

  assertExists(
    join(installedLibrary, "dist", "index.js"),
    "JavaScript distribuido"
  );

  assertExists(
    join(installedLibrary, "dist", "index.d.ts"),
    "Declaracoes TypeScript"
  );

  console.log("\n===== EXECUTANDO BUILD EXTERNO =====");

  runNpm(["run", "build"], consumerDir);

  assertExists(
    join(consumerDir, "dist", "index.html"),
    "Build externo"
  );

  console.log("\n===== VALIDACAO APROVADA =====");
  console.log("Pacote real instalado e compilado em consumidor isolado.");
} finally {
  console.log("\n===== LIMPANDO AMBIENTE TEMPORARIO =====");

  rmSync(tempRoot, { recursive: true, force: true });

  console.log("Ambiente temporario removido.");
}
