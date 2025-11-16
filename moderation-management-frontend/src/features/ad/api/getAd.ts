import { apiRequest } from '@/lib/api-client';
import type { Advertisement } from '@/types/api/api';

export const getAdById = async (id: string) => {
  return apiRequest(`http://localhost:3001/api/v1/ads/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }) as Promise<Advertisement>;
};
