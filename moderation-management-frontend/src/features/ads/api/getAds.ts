// ads-api.ts
import { apiRequest } from '@/lib/api-client';
import type { GetAdsQuery, GetAdsResponse } from '@/types/api/api.ts';

export const getAdsApi = async (queryParams: GetAdsQuery = {}): Promise<GetAdsResponse> => {
  const params = new URLSearchParams();

  const { page, limit, status, categoryId, minPrice, maxPrice, search, sortBy, sortOrder } = queryParams;

  if (page) params.set('page', page.toString());
  if (limit) params.set('limit', limit.toString());
  if (categoryId) params.set('categoryId', categoryId.toString());
  if (minPrice) params.set('minPrice', minPrice.toString());
  if (maxPrice) params.set('maxPrice', maxPrice.toString());
  if (search) params.set('search', search);
  if (sortBy) params.set('sortBy', sortBy);
  if (sortOrder) params.set('sortOrder', sortOrder);

  if (status && status.length > 0) {
    status.forEach(s => params.append('status', s));
  }

  const query = params.toString();

  return apiRequest(`http://localhost:3001/api/v1/ads?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }) as Promise<GetAdsResponse>;
};
