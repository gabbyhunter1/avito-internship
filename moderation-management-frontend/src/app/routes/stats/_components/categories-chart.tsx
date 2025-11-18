import { ChartBarHorizontal } from '@/components/ui/chart-bar-horizontal.tsx';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesChart } from '@/features/stats/api/stats.ts';
import type { StatsPeriod } from '@/types/api/api.ts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const CategoriesChart = ({ period }: { period: StatsPeriod }) => {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['statsCategories', period],
    queryFn: () => getCategoriesChart(period),
  });

  if (categoriesLoading) return <CategoriesChartSkeleton />;

  const categoriesChartData: Record<string, any>[] = categories
    ? Object.entries(categories).map(([category, value]) => ({
        category,
        value: Number((value as number).toFixed(0)),
        fill: 'var(--chart-1)',
      }))
    : [];

  return (
    <>
      {categoriesLoading ? (
        <CategoriesChartSkeleton />
      ) : (
        <ChartBarHorizontal
          title="Категории проверенных объявлений"
          description="Статистика по проверенным объявлением за выбранный период"
          chartData={categoriesChartData}
        />
      )}
    </>
  );
};

const CategoriesChartSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Категории проверенных объявлений</CardTitle>
        <CardDescription>Статистика по проверенным объявлением за выбранный период</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-90 h-10" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesChart;
