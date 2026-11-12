# Referência de componentes — VisualForge

[English](../components.md) | **Português (Brasil)**

API atual da versão `v0.1.0-alpha.0`, para uso dentro do workspace. O pacote ainda não está publicado no npm.

## Importação

```tsx
import { KpiCard, BarChart, LineChart, AreaChart, DonutChart, StackedBarChart, ScatterChart } from '@visualforge/react';
```

## KpiCard

Propriedades obrigatórias: `title: string`, `value: string | number`. Opcionais: `change?: string`, `description?: string`, `accentColor?: string` (padrão `#22D3EE`). A mudança e a descrição só aparecem se houver conteúdo.

```tsx
<KpiCard title="Receita" value="R$ 12.000" change="+8%" />
```

## BarChart, LineChart e AreaChart

Recebem `data: ChartDataPoint[]`, com itens `{ name: string; value: number }`. Também aceitam `height?: number` (padrão `280`) e `color?: string`.

- `BarChart`: cor padrão `#2563EB`; sem mensagem explícita para lista vazia.
- `LineChart`: cor padrão `#22D3EE`; sem mensagem explícita para lista vazia.
- `AreaChart`: cor padrão `#22D3EE`; mostra `No data available` para lista vazia.

```tsx
const dados = [{ name: 'Jan', value: 42 }, { name: 'Fev', value: 58 }];
<BarChart data={dados} />
<LineChart data={dados} />
<AreaChart data={dados} />
```

Os gráficos usam `ResponsiveContainer`; o contêiner pai precisa ter largura utilizável.

## DonutChart

`data: DonutDataPoint[]` (obrigatório), com `{ name: string; value: number }`. Opcionais: `height?: number` (280), `colors?: string[]` (paleta interna) e `showLegend?: boolean` (`true`). Apenas valores finitos maiores que zero são exibidos; sem valores válidos, mostra `No data available`.

```tsx
<DonutChart data={[{ name: 'Produtos', value: 65 }, { name: 'Serviços', value: 35 }]} />
```

## StackedBarChart

`data: StackedBarDataPoint[]` e `series: StackedBarSeries[]` são obrigatórios; `height?: number` tem padrão 280. Cada ponto tem `name: string` e campos de séries com valores `string | number`. Cada série tem `dataKey: string`, `name?: string` e `color?: string`. Os `dataKey` devem corresponder a campos numéricos nos dados.

```tsx
<StackedBarChart
  data={[{ name: 'Jan', online: 30, loja: 12 }]}
  series={[{ dataKey: 'online', name: 'Online' }, { dataKey: 'loja', name: 'Loja' }]}
/>
```

Sem dados ou séries, mostra `No data available`. Todas as séries são empilhadas no mesmo grupo.

## ScatterChart

Exibe relações entre duas variáveis numéricas utilizando um gráfico de dispersão.

### Estrutura dos dados

Cada ponto deve conter:

- `x: number` — coordenada horizontal.
- `y: number` — coordenada vertical.
- `name?: string` — identificação opcional.

### Propriedades

| Propriedade | Tipo | Obrigatória | Padrão |
| --- | --- | --- | --- |
| `data` | `ScatterDataPoint[]` | Sim | — |
| `height` | `number` | Não | `280` |
| `color` | `string` | Não | `#22D3EE` |
| `accessibilityLabel` | `string` | Não | `"Scatter chart"` |
| `accessibilityDescription` | `string` | Não | Não definido |

### Exemplo

    <ScatterChart
      data={[
        { x: 10, y: 20, name: "Produto A" },
        { x: 30, y: 40, name: "Produto B" },
      ]}
      accessibilityLabel="Correlação de vendas"
      accessibilityDescription="Relação entre duas medidas numéricas"
    />

### Comportamento

O componente filtra os dados antes da renderização. Os testes confirmam a exclusão de coordenadas não finitas nos cenários avaliados.

Quando não existem pontos válidos, apresenta `No data available`.

O gráfico possui identificação acessível e aceita uma descrição opcional.

Utiliza `ResponsiveContainer` do Recharts; portanto, o elemento pai precisa oferecer largura utilizável.

## Limitações

O pacote permanece privado e não está publicado no npm. Seus exports apontam para JavaScript compilado e declarações TypeScript em dist. O tratamento de dados vazios ainda não é uniforme e a validação dos dados é limitada. Consulte a [referência original em inglês](../components.md) para acompanhar a evolução da API.
