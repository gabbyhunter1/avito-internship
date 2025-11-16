import FiltersBlock from '@/app/routes/list/_components/filters/filters-block.tsx';
import { useQuery } from '@tanstack/react-query';
import { getAdsApi } from '@/features/ads/api/getAds.ts';
import { useState } from 'react';
import type { GetAdsQuery } from '@/types/api/api.ts';
import { Separator } from '@/components/ui/separator.tsx';
import PaginationMenu from '@/app/routes/list/_components/ad-card/pagination.tsx';
import AdsList from '@/app/routes/list/_components/ads-list.tsx';
import AdCardSkeleton from '@/app/routes/list/_components/ad-card/ad-card-skeleton.tsx';

const ListPage = () => {
  const [filters, setFilters] = useState<GetAdsQuery>({
    status: [],
    categoryId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    search: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['ads', filters],
    queryFn: () =>
      getAdsApi({
        ...filters,
      }),
  });

  return (
    <div className="flex h-full justify-center mt-20 mb-60">
      <div className="max-w-5xl w-full bg-secondary rounded-3xl">
        <div className="p-4">
          <FiltersBlock setFilters={setFilters} />
          <Separator className="my-10" />
          {isLoading ? (
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-28">
              <AdCardSkeleton />
              <AdCardSkeleton />
              <AdCardSkeleton />
              <AdCardSkeleton />
            </div>
          ) : (
            <>
              <AdsList ads={data?.ads} />
              <PaginationMenu pagination={data?.pagination} setFilters={setFilters} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
