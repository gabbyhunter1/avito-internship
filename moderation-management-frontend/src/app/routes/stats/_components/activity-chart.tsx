import { HighlightedMultipleBarChart } from '@/components/ui/highlighted-multiple-bar-chart.tsx';
import { useQuery } from '@tanstack/react-query';
import { getActivityChart } from '@/features/stats/api/stats.ts';
import type { StatsPeriod } from '@/types/api/api.ts';
import { Card } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { colorsMap } from '@/app/routes/stats/_components/data/constant.ts';

const ActivityChart = ({ period }: { period: StatsPeriod }) => {
  const { data: activity, isLoading: activityLoading } = useQuery({
    queryKey: ['statsActivity', period],
    queryFn: () => getActivityChart(period),
  });

  if (activityLoading) {
    return <ActivityChartSkeleton />;
  }

  const formattedActivity: Record<string, any>[] = (activity ?? []).map(item => {
    const date = new Date(item.date);

    let options: Intl.DateTimeFormatOptions | undefined;

    switch (period) {
      case 'month':
        options = { day: '2-digit', month: '2-digit' };
        break;
      case 'week':
      case 'today':
        options = { weekday: 'short' };
        break;
      default:
        return item as Record<string, any>;
    }

    const formattedDate = date.toLocaleDateString('ru-RU', options);

    return {
      ...item,
      date: formattedDate,
    };
  });

  return (
    <HighlightedMultipleBarChart
      title="Активность"
      description="Статистика активности за выбранный период"
      chartData={formattedActivity}
      colorsMap={colorsMap}
      labelMap={{
        approved: 'Одобрено',
        rejected: 'Отклонено',
        requestChanges: 'На доработку',
      }}
    />
  );
};

const ActivityChartSkeleton = () => {
  return (
    <Card className="w-full h-[400px] p-0">
      <Skeleton className="w-full h-full" />
    </Card>
  );
};

export default ActivityChart;
