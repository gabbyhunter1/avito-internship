import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { CategoryMap, type GetAdsQuery } from '@/types/api/api.ts';
import { type Dispatch, type SetStateAction } from 'react';
import FilterInput from '@/app/routes/list/_components/filters/input.tsx';
import SelectFilter from '@/app/routes/list/_components/filters/select-filter.tsx';
import PriceSlider from '@/app/routes/list/_components/filters/price-slider.tsx';
import MultiSelectFilterMenu from '@/app/routes/list/_components/filters/multi-select-filter-menu.tsx';

const FiltersBlock = ({ setFilters }: { setFilters: Dispatch<SetStateAction<GetAdsQuery>> }) => {
  return (
    <Card className="w-full">
      <CardHeader className="place-items-center">
        <CardTitle>Фильтры</CardTitle>
        <CardDescription>Выберите, как отсортировать объявления</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex gap-5 md:gap-15 justify-center">
            <MultiSelectFilterMenu setFilters={setFilters} />
            <SelectFilter placeholder={'Категории'} items={CategoryMap} setFilters={setFilters} />
          </div>

          <div className="flex flex-col justify-center gap-4">
            <FilterInput setFilters={setFilters} />
            <PriceSlider setFilters={setFilters} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiltersBlock;
