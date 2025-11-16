import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import type { CategoryStats } from '@/features/stats/api/stats.ts';

const CategoriesBarChart = ({ categories }: { categories: CategoryStats | undefined }) => {
  const categoriesData = useMemo(
    () =>
      categories
        ? Object.entries(categories).map(([name, value]) => ({
            name,
            value,
          }))
        : [],
    [categories]
  );

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Категории объявлений</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoriesData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoriesBarChart;
