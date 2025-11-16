import { apiRequest } from '@/lib/api-client.ts';
import type { ModerationAction, RejectAdRequestBody, RejectAdResponse, RequestChangesRequestBody, RequestChangesResponse } from '@/types/api/api.ts';

export function approveAd(id: number) {
  return apiRequest<ModerationAction>(`http://localhost:3001/api/v1/ads/${id}/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function rejectAd(id: number, body: RejectAdRequestBody) {
  return apiRequest<RejectAdResponse>(`http://localhost:3001/api/v1/ads/${id}/reject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function requestChanges(id: number, body: RequestChangesRequestBody) {
  return apiRequest<RequestChangesResponse>(`http://localhost:3001/api/v1/ads/${id}/request-changes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
