import { Skeleton } from '@/components/ui/skeleton.tsx';

const AdCardSkeleton = () => {
  return (
    <div className="rounded-md max-w-[260px] w-full sm:rounded-lg md:rounded-3xl bg-white dark:bg-neutral-100 p-2 sm:p-3 md:p-4 shadow-xl ring-1 ring-neutral-200/50 dark:bg-neutral-950 dark:ring-neutral-800/50">
      <div className="w-full h-full overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-start">
              <div className="flex justify-between items-center justify-center w-full">
                <div className="flex items-center justify-center flex-col gap-2 w-full">
                  <div className="w-full flex justify-between items-center gap-2">
                    <Skeleton className="inline-flex h-5 w-16 rounded-full" />
                    <Skeleton className="inline-flex h-5 w-16 rounded-full" />
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                  <Skeleton className="mt-3 w-[230px] h-[190px] rounded-xl" />
                  <Skeleton className="mt-3 h-6 w-[220px] rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 px-4 overflow-hidden flex-grow">
            <div>
              <div className="flex flex-col items-start justify-between mb-4">
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-40 rounded-full" />
                </div>
              </div>

              <div style={{ overflow: 'hidden', height: 0 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCardSkeleton;
