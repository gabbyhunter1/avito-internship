import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useMemo } from 'react';
import type { DecisionsData } from '@/types/api/api.ts';

const DecisionsPieChart = ({ decisions }: { decisions: DecisionsData | undefined }) => {
  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

  const decisionsData = useMemo(
    () => [
      { name: 'Одобрено', value: decisions?.approved },
      { name: 'Отклонено', value: decisions?.rejected },
      { name: 'На доработку', value: decisions?.requestChanges },
    ],
    [decisions]
  );

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Распределение решений</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={decisionsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value">
              {decisionsData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DecisionsPieChart;
