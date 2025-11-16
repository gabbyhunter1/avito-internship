import { useEffect, useState } from 'react';
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from '@/components/ui/popover-form.tsx';
import { useModerationActions } from '@/app/routes/item/:id/_actions/useModerationActions.ts';
import type { ModerationReason } from '@/types/api/api.ts';
import { toast } from 'sonner';

type FormState = 'idle' | 'loading' | 'success';

// список причин из схемы бекенда
const REASONS: ModerationReason[] = [
  'Запрещенный товар',
  'Неверная категория',
  'Некорректное описание',
  'Проблемы с фото',
  'Подозрение на мошенничество',
  'Другое',
];

const RejectButton = ({ adId }: { adId: number }) => {
  const { rejectMutation } = useModerationActions(adId);

  const [formState, setFormState] = useState<FormState>('idle');
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ModerationReason | ''>('');
  const [comment, setComment] = useState('');

  const loading = formState === 'loading' || rejectMutation.isPending;

  async function submit() {
    if (!reason) return;

    try {
      setFormState('loading');

      await rejectMutation.mutateAsync({
        reason,
        comment: comment || undefined,
      });

      setFormState('success');

      setTimeout(() => {
        setOpen(false);
        setFormState('idle');
        setReason('');
        setComment('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setFormState('idle');
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PopoverForm
      title="Отклонить"
      open={open}
      setOpen={setOpen}
      width="364px"
      height="320px"
      showCloseButton={formState !== 'success'}
      showSuccess={formState === 'success'}
      openChild={
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!reason) return;
            void submit();
          }}
          className="space-y-4">
          <div className="px-4 pt-4">
            <label htmlFor="reason" className="mb-1 block text-sm font-medium text-muted-foreground">
              Причина отклонения
            </label>
            <select
              id="reason"
              value={reason}
              onChange={e => setReason(e.target.value as ModerationReason)}
              className="w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:bg-black"
              required>
              <option value="" disabled>
                Выберите причину
              </option>
              {REASONS.map(r => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4">
            <label htmlFor="comment" className="mb-1 block text-sm font-medium text-muted-foreground">
              Комментарий (необязательно)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:bg-black"
              rows={3}
            />
          </div>

          <div className="relative flex h-12 items-center px-[10px]">
            <PopoverFormSeparator />
            <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
              <PopoverFormCutOutLeftIcon />
            </div>
            <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
              <PopoverFormCutOutRightIcon />
            </div>
            <PopoverFormButton loading={loading} text="Отклонить" />
          </div>
        </form>
      }
      successChild={<PopoverFormSuccess title="Объявление отклонено" description="Решение и комментарий сохранены в истории модерации." />}
    />
  );
};

export default RejectButton;
