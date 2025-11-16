import { apiRequest } from '@/lib/api-client';
import type { Advertisement } from '@/types/api/api';

export const getModerator = async () => {
  return apiRequest(`http://localhost:3001/api/v1/moderators/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }) as Promise<Advertisement>;
};
