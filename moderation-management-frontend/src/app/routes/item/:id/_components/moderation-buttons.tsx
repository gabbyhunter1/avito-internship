import { Button } from '@/components/ui/button';
import { useModerationActions } from '@/app/routes/item/:id/_actions/useModerationActions.ts';
import type { ModerationReason } from '@/types/api/api.ts';
import RejectButton from '@/app/routes/item/:id/_components/reject-button.tsx';

export function ModerationButtons({ adId }: { adId: number }) {
  const { approveMutation, requestChangesMutation } = useModerationActions(adId);

  return (
    <div className="flex w-full flex-wrap justify-around mt-10">
      <Button className="!bg-green-500 !text-white cursor-pointer" onClick={() => approveMutation.mutate()} disabled={approveMutation.isPending}>
        Одобрить
      </Button>

      <RejectButton adId={adId} />

      <Button
        className="!bg-yellow-500 !text-white cursor-pointer"
        onClick={() =>
          requestChangesMutation.mutate({
            reason: 'Проблемы с фото' as ModerationReason,
            comment: 'Нужны более четкие фотографии',
          })
        }
        disabled={requestChangesMutation.isPending}>
        Доработка
      </Button>
    </div>
  );
}

export default ModerationButtons;
