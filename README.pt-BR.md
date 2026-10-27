# VisualForge

**Construa. Visualize. Reutilize.**

[English](README.md) | **Português (Brasil)**

VisualForge é uma biblioteca open source de componentes React para dashboards e visualização de dados, desenvolvida com TypeScript e Recharts.

> **Versão alfa:** `v0.1.0-alpha.0`. O pacote `@visualforge/react` ainda **não está publicado no npm**. Os exemplos funcionam dentro deste repositório, usando npm workspaces.

## Para quem é este projeto?

- **Iniciantes:** comece pelo [guia passo a passo](docs/pt-BR/getting-started.md).
- **Desenvolvedores:** consulte a [referência de componentes](docs/pt-BR/components.md).
- **Contribuidores:** veja [como contribuir](CONTRIBUTING.pt-BR.md).

## Demonstração Visual

Explore o VisualForge Studio, a galeria interativa de componentes React reutilizáveis para dashboards modernos.

### Visão Geral do Studio

![Visão geral do VisualForge Studio](docs/screenshots/gallery-overview.png)

### Galeria de Gráficos

Explore gráficos de barras, linhas, áreas, rosca e barras empilhadas.

![Gráficos do VisualForge](docs/screenshots/charts-showcase.png)

### Métricas e KPIs

Construa dashboards executivos com cartões de indicadores reutilizáveis.

![Métricas e KPIs do VisualForge](docs/screenshots/metrics-showcase.png)

## Componentes

| Componente | Finalidade |
| --- | --- |
| `KpiCard` | Indicadores de desempenho |
| `BarChart` | Comparação entre categorias |
| `LineChart` | Tendências em linhas |
| `AreaChart` | Tendências com área preenchida |
| `DonutChart` | Composição e proporções |
| `StackedBarChart` | Comparação de séries empilhadas |

## Requisitos

Node.js 24, npm 11 e Git.

## Executar no computador

```bash
git clone https://github.com/afonsooliveiradev/VisualForge.git
cd VisualForge
npm ci
npm run dev
```

Abra o endereço local exibido pelo Vite. A galeria interativa fica em `apps/gallery`.

## Verificações de qualidade

```bash
npm run typecheck
npm test
npm run build
npm audit
```

## Estrutura

- `apps/gallery`: VisualForge Studio (galeria).
- `packages/react`: componentes reutilizáveis.
- `docs`: documentação técnica.
- `examples`: exemplos de integração.

## Limitações atuais

- A biblioteca ainda é um pacote privado de workspace, não instalável pelo registro npm.
- Os exports apontam para arquivos TypeScript; ainda falta um build de distribuição com declarações de tipos.
- A acessibilidade, validação de dados e cobertura de testes estão evoluindo.

## Comunidade e licença

Consulte o [guia de contribuição](CONTRIBUTING.pt-BR.md), o [código de conduta](CODE_OF_CONDUCT.md) e a [política de segurança](SECURITY.md). Licença [MIT](LICENSE).
