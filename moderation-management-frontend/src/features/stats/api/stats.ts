import { apiRequest } from '@/lib/api-client';
import type { ActivityData, DecisionsData, StatsPeriod, StatsSummary } from '@/types/api/api';

const API_URL = 'http://localhost:3001/api/v1';

export type CategoryStats = Record<string, number>;

const buildQuery = (period: StatsPeriod) => {
  const params = new URLSearchParams();
  if (period) params.set('period', period);
  return params.toString() ? `?${params.toString()}` : '';
};

export const getStatsSummary = (period: StatsPeriod) =>
  apiRequest<StatsSummary>(`${API_URL}/stats/summary${buildQuery(period)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

export const getActivityChart = (period: StatsPeriod) =>
  apiRequest<ActivityData[]>(`${API_URL}/stats/chart/activity${buildQuery(period)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

export const getDecisionsChart = (period: StatsPeriod) =>
  apiRequest<DecisionsData>(`${API_URL}/stats/chart/decisions${buildQuery(period)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

export const getCategoriesChart = (period: StatsPeriod) =>
  apiRequest<CategoryStats>(`${API_URL}/stats/chart/categories${buildQuery(period)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
