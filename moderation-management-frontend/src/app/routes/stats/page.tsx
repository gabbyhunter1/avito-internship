import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import type { StatsPeriod } from '@/types/api/api.ts';
import CategoriesChart from '@/app/routes/stats/_components/categories-chart.tsx';
import DecisionsPieChart from '@/app/routes/stats/_components/decisions-pie-chart.tsx';
import ActivityChart from '@/app/routes/stats/_components/activity-chart.tsx';
import MetricCards from './_components/metric-cards';

const StatsPage = () => {
  const [period, setPeriod] = useState<StatsPeriod>('month');

  const handlePeriodChange = (value: string) => {
    setPeriod(value as StatsPeriod);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Статистика</h1>
          <Select value={period} onValueChange={handlePeriodChange}>
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
          <MetricCards period={period} />
        </div>

        <ActivityChart period={period} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DecisionsPieChart period={period} />
          <CategoriesChart period={period} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
