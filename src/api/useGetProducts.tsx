import { useQuery } from '@tanstack/react-query';

import type { IProduct, IProductResponse } from '../types/types';

export const useGetProducts = () => {
  const { data, isLoading, isError } = useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://dummyjson.com/products');
      const data: IProductResponse = await res.json();
      return data.products;
    },
  });
  return { data, isLoading, isError };
};
