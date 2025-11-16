import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getActivityChart, getCategoriesChart, getDecisionsChart, getStatsSummary } from '@/features/stats/api/stats';
import { useQuery } from '@tanstack/react-query';
import type { StatsPeriod } from '@/types/api/api.ts';
import CategoriesBarChart from '@/app/routes/stats/_components/categories-bar-chart.tsx';
import DecisionsPieChart from '@/app/routes/stats/_components/decisions-pie-chart.tsx';
import ActivityChart from '@/app/routes/stats/_components/activity-chart.tsx';

const StatsPage = () => {
  const [period, setPeriod] = useState<StatsPeriod>('today');

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['statsSummary', period],
    queryFn: () => getStatsSummary(period),
  });

  const { data: activity, isLoading: activityLoading } = useQuery({
    queryKey: ['statsActivity', period],
    queryFn: () => getActivityChart(period),
  });

  const { data: decisions, isLoading: decisionsLoading } = useQuery({
    queryKey: ['statsDecisions', period],
    queryFn: () => getDecisionsChart(period),
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['statsCategories', period],
    queryFn: () => getCategoriesChart(period),
  });

  const avgTimeMinutes = useMemo(() => {
    if (!summary) return null;
    return (summary.averageReviewTime / 1000 / 60).toFixed(1);
  }, [summary]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Статистика</h1>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[200px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="week">7 дней</SelectItem>
              <SelectItem value="month">30 дней</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle>Проверено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold ">{summary?.totalReviewed}</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Одобрено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{summary?.approvedPercentage.toFixed(0)}%</div>
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
              <div className="text-3xl font-bold text-red-600">{summary?.rejectedPercentage.toFixed(0)}%</div>
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
        </div>

        {/* Activity Chart */}
        <ActivityChart activity={activity} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Decisions Pie Chart */}
          <DecisionsPieChart decisions={decisions} />

          {/* Categories Bar Chart */}
          <CategoriesBarChart categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
