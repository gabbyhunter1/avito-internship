import { type Dispatch, type SetStateAction, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { GetAdsQuery } from '@/types/api/api.ts';

const PriceSlider = ({ setFilters }: { setFilters: Dispatch<SetStateAction<GetAdsQuery>> }) => {
  const maxPrice = 100693; // according to the API
  const [value, setValue] = useState([0, maxPrice]);

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="sr-only" htmlFor="slider">
        Слайдер по цене
      </Label>
      <Slider
        id="slider"
        max={maxPrice}
        min={0}
        value={value}
        onValueChange={setValue}
        onValueCommit={val => {
          setFilters(prev => ({
            ...prev,
            minPrice: val[0],
            maxPrice: val[1],
          }));
        }}
      />
      <div className="flex items-center justify-between text-muted-foreground text-sm">
        <span>{value[0]}₽</span>
        <span>{value[1]}₽</span>
      </div>
    </div>
  );
};

export default PriceSlider;
