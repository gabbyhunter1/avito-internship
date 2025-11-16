import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { CategoryMap, type CategoryName, type GetAdsQuery } from '@/types/api/api.ts';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

const SelectFilter = ({
  placeholder,
  items,
  setFilters,
}: {
  placeholder: string;
  items: typeof CategoryMap;
  setFilters: Dispatch<SetStateAction<GetAdsQuery>>;
}) => {
  const [selected, setSelected] = useState<number>();

  const handleSelect = (value: CategoryName) => {
    if (selected === items[value]) {
      setSelected(undefined);
    } else {
      setSelected(items[value]);
    }
  };

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      categoryId: selected,
    }));
  }, [selected]);

  return (
    <Select onValueChange={(value: CategoryName) => handleSelect(value)}>
      <SelectTrigger className="w-full max-w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {Object.entries(items).map(([name, id]) => (
            <SelectItem key={`${id} - ${name}`} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
