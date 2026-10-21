# Primeiros passos com a VisualForge

[English README](../../README.md) | [Início em português](../../README.pt-BR.md)

Este guia é para quem está começando. **Não é necessário publicar o pacote no npm** para testar a VisualForge dentro do repositório.

## 1. Preparar as ferramentas

Instale Git, Node.js 24 e npm 11. Abra um terminal (PowerShell, bash ou terminal integrado do VS Code).

Confira as versões:

```bash
node --version
npm --version
git --version
```

## 2. Obter o código

```bash
git clone https://github.com/afonsooliveiradev/VisualForge.git
cd VisualForge
```

O comando `git clone` copia o repositório; `cd` entra na pasta.

## 3. Instalar dependências

```bash
npm ci
```

O comando instala as dependências registradas no arquivo de lock.

## 4. Abrir a galeria

```bash
npm run dev
```

Abra no navegador o endereço informado pelo Vite. Para parar, pressione `Ctrl+C` no terminal.

## 5. Conferir a qualidade

```bash
npm run typecheck
npm test
npm run build
```

- `typecheck`: verifica os tipos TypeScript.
- `test`: executa os testes automatizados.
- `build`: gera a versão de produção da galeria.

## 6. Conhecer os componentes

Leia a [referência técnica em português](components.md). Para contribuir, siga o [guia de contribuição](../../CONTRIBUTING.pt-BR.md).

## Problemas comuns

- `node` não reconhecido: confira a instalação e reinicie o terminal.
- Dependências com erro: confirme Node.js 24 e npm 11; rode `npm ci` na raiz.
- Porta ocupada: utilize o endereço que o Vite mostrar, que pode ser diferente de `5173`.
- Não encontrou pacote no npm: esperado nesta fase alfa; use o workspace do repositório.
