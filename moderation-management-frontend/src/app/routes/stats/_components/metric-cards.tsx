import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getStatsSummary } from '@/features/stats/api/stats.ts';
import { useMemo } from 'react';
import type { StatsPeriod } from '@/types/api/api.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const MetricCards = ({ period }: { period: StatsPeriod }) => {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['statsSummary', period],
    queryFn: () => getStatsSummary(period),
  });

  const avgTimeMinutes = useMemo(() => {
    if (!summary) return null;
    return (summary.averageReviewTime / 1000 / 60).toFixed(1);
  }, [summary]);

  return (
    <>
      <Card className="border-2 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle>Проверено</CardTitle>
        </CardHeader>
        <CardContent>{summaryLoading ? <MetricCardsSkeleton /> : <div className="text-3xl font-bold ">{summary?.totalReviewed}</div>}</CardContent>
      </Card>

      <Card className="border-2 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Одобрено
          </CardTitle>
        </CardHeader>
        <CardContent>
          {summaryLoading ? (
            <MetricCardsSkeleton />
          ) : (
            <div className="text-3xl font-bold text-green-600">{summary?.approvedPercentage.toFixed(0)}%</div>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-600" />
            Отклонено
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-600">
            {summaryLoading ? <MetricCardsSkeleton /> : `${summary?.rejectedPercentage.toFixed(0)}%`}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Ср. время
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">{avgTimeMinutes} мин</div>
        </CardContent>
      </Card>
    </>
  );
};

const MetricCardsSkeleton = () => {
  return <Skeleton className="w-10 h-9" />;
};

export default MetricCards;
