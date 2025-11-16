import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveAd, rejectAd, requestChanges } from '@/features/ad/api/adModeration.ts';
import type { RejectAdRequestBody, RequestChangesRequestBody } from '@/types/api/api.ts';

export function useModerationActions(adId: number) {
  const qc = useQueryClient();

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['adsByID', adId] });
    qc.invalidateQueries({ queryKey: ['ads'] }); // список
  };

  const approveMutation = useMutation({
    mutationFn: () => approveAd(adId),
    onSuccess: invalidate,
  });

  const rejectMutation = useMutation({
    mutationFn: (data: RejectAdRequestBody) => rejectAd(adId, data),
    onSuccess: invalidate,
  });

  const requestChangesMutation = useMutation({
    mutationFn: (data: RequestChangesRequestBody) => requestChanges(adId, data),
    onSuccess: invalidate,
  });

  return {
    approveMutation,
    rejectMutation,
    requestChangesMutation,
  };
}
