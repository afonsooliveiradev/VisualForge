# Como contribuir com a VisualForge

[English](CONTRIBUTING.md) | **Português (Brasil)**

Contribuições de todos os níveis são bem-vindas: documentação, testes, correções, acessibilidade e novos componentes.

## Primeiro contato

Se você está começando, leia o [guia de instalação](docs/pt-BR/getting-started.md). Para mudanças significativas de API, abra uma issue antes de desenvolver.

## Preparar o ambiente

Instale Node.js 24, npm 11 e Git. Na raiz do repositório:

```bash
npm ci
npm run dev
```

## Fluxo recomendado

1. Atualize sua branch `main` e crie uma branch de trabalho.
2. Faça mudanças pequenas e relacionadas ao objetivo.
3. Atualize os testes e a documentação quando mudar comportamentos.
4. Exporte componentes públicos e seus tipos em `packages/react/src/index.ts`.
5. Inclua demonstrações na galeria para componentes visuais.
6. Execute as verificações e abra um Pull Request para revisão.

## Antes do Pull Request

```bash
npm run typecheck
npm test
npm run build
npm audit
```

Explique o que mudou, por quê, como foi testado e inclua capturas de tela quando houver mudanças visuais. Não envie segredos, tokens ou arquivos `.env`.

## Comunicação

Siga o [código de conduta](CODE_OF_CONDUCT.md). Para vulnerabilidades, não abra uma issue pública: leia [SECURITY.md](SECURITY.md).

As contribuições seguem a [licença MIT](LICENSE).
