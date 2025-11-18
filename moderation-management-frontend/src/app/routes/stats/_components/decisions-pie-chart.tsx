import { IncreaseSizePieChart } from '@/components/ui/increase-size-pie-chart.tsx';
import { useQuery } from '@tanstack/react-query';
import { getDecisionsChart } from '@/features/stats/api/stats.ts';
import type { StatsPeriod } from '@/types/api/api.ts';
import { colorsMap } from '@/app/routes/stats/_components/data/constant.ts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const DecisionsPieChart = ({ period }: { period: StatsPeriod }) => {
  const { data: decisions, isLoading: decisionsLoading } = useQuery({
    queryKey: ['statsDecisions', period],
    queryFn: () => getDecisionsChart(period),
  });

  if (decisionsLoading) {
    return <DecisionsChartSkeleton />;
  }

  const labelMap = {
    value: 'Одобрено',
    status: 'Отклонено',
    requestChanges: 'На доработку',
  };

  const decisionsChartData: Record<string, any>[] = decisions
    ? Object.entries(decisions).map(([status, value]) => ({
        status,
        value: Number((value as number).toFixed(0)),
        fill: colorsMap[status as keyof typeof colorsMap],
      }))
    : [];

  return (
    <IncreaseSizePieChart
      title="Решения по объявлениям"
      description="Распределение за выбранный период"
      chartData={decisionsChartData}
      chartConfig={{
        values: {
          label: 'Процент',
        },
        approved: {
          label: 'Одобрено',
        },
        rejected: {
          label: 'Отклонено',
          color: 'var(--chart-2)',
        },
        requestChanges: {
          label: 'Доработка',
          color: 'var(--chart-3)',
        },
      }}
      labelMap={labelMap}
      colorsMap={colorsMap}
      valueKey="value"
      nameKey="status"
    />
  );
};

const DecisionsChartSkeleton = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Решения по объявлениям</CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-60" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex justify-center">
          <Skeleton className="h-64 w-64" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionsPieChart;
