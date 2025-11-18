import { Bar, BarChart, Cell, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';
import { useState } from 'react';
import { generateChartConfig, getDataKeys } from '@/lib/generateChartConfig.tsx';

export function HighlightedMultipleBarChart({
  title,
  description = '',
  chartData,
  colorsMap,
  labelMap = undefined,
}: {
  title: string;
  description?: string;
  chartData: Record<string, any>[];
  colorsMap: any;
  labelMap?: any;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartConfig = generateChartConfig(chartData, undefined, labelMap, colorsMap);
  const dataKeys = getDataKeys(chartData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} onMouseLeave={() => setActiveIndex(null)}>
            <rect x="0" y="0" width="100%" height="85%" fill="url(#default-multiple-pattern-dots)" />
            <defs>
              <DottedBackgroundPattern />
            </defs>
            <XAxis
              dataKey={Object.keys(chartData[0])[0]}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            {dataKeys.map(key => (
              <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${key}-${index}`}
                    fillOpacity={activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3}
                    stroke={activeIndex === index ? 'var(--color-mobile)' : ''}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="duration-200"
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const DottedBackgroundPattern = () => {
  return (
    <pattern id="default-multiple-pattern-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle className="dark:text-muted/40 text-muted" cx="2" cy="2" r="1" fill="currentColor" />
    </pattern>
  );
};
