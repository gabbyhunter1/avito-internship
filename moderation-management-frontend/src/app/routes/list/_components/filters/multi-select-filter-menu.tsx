import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import { type GetAdsQuery, type Status, StatusArray } from '@/types/api/api.ts';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

const MultiSelectFilterMenu = ({ setFilters }: { setFilters: Dispatch<SetStateAction<GetAdsQuery>> }) => {
  const [selected, setSelected] = useState<Status[]>([]);

  const handleSelect = (value: Status) => {
    setSelected(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
  };

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      status: selected,
    }));
  }, [selected]);

  return (
    <MultiSelect>
      <MultiSelectTrigger className="w-full max-w-[150px]">
        <MultiSelectValue overflowBehavior="cutoff" placeholder="Статус" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          {StatusArray.map((item, index) => (
            <MultiSelectItem key={`${item}: ${index}`} onSelect={() => handleSelect(item)} value={item}>
              {item}
            </MultiSelectItem>
          ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  );
};

export default MultiSelectFilterMenu;
