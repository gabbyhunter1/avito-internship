import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import type { GetAdsQuery } from '@/types/api/api.ts';
import { Input } from '@/components/ui/input.tsx';

const FilterInput = ({ setFilters }: { setFilters: Dispatch<SetStateAction<GetAdsQuery>> }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: inputValue,
      }));
    }, 700);

    return () => clearTimeout(timeout);
  }, [inputValue, setInputValue]);

  return <Input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" placeholder="Поиск по названию" />;
};

export default FilterInput;
