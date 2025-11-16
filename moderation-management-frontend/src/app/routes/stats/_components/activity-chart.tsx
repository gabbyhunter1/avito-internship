import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ActivityData } from '@/types/api/api.ts';
import { useMemo } from 'react';

const ActivityChart = ({ activity }: { activity: ActivityData[] | undefined }) => {
  const activityChartData = useMemo(
    () =>
      activity?.map(item => ({
        date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
        Одобрено: item.approved,
        Отклонено: item.rejected,
        'На доработку': item.requestChanges,
      })) || [],
    [activity]
  );

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>График активности</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Одобрено" fill="#10b981" />
            <Bar dataKey="Отклонено" fill="#ef4444" />
            <Bar dataKey="На доработку" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
