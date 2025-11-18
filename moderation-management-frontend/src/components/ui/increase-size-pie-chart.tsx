import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';

type PieChartCardProps = {
  title: string;
  description?: string;
  chartData: Array<Record<string, any>>;
  chartConfig: ChartConfig;
  valueKey: string;
  nameKey: string;
};

export function IncreaseSizePieChart({ title, description, chartData, chartConfig, valueKey, nameKey }: PieChartCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey={valueKey} nameKey={nameKey} label={({ value }) => `${value}%`} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
