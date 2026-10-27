import { lazy } from "react";

export const BarChart = lazy(() =>
  import("../../../packages/react/src/components/BarChart").then(
    (module) => ({ default: module.BarChart })
  )
);

export const LineChart = lazy(() =>
  import("../../../packages/react/src/components/LineChart").then(
    (module) => ({ default: module.LineChart })
  )
);

export const AreaChart = lazy(() =>
  import("../../../packages/react/src/components/AreaChart").then(
    (module) => ({ default: module.AreaChart })
  )
);

export const DonutChart = lazy(() =>
  import("../../../packages/react/src/components/DonutChart").then(
    (module) => ({ default: module.DonutChart })
  )
);

export const StackedBarChart = lazy(() =>
  import("../../../packages/react/src/components/StackedBarChart").then(
    (module) => ({ default: module.StackedBarChart })
  )
);