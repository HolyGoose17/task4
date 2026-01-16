import { useQuery } from '@tanstack/react-query';

import type { IProduct } from '../types/types';

export const useGetProductById = (id: number) => {
  const { data, isLoading, error } = useQuery<IProduct>({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data: IProduct = await res.json();
      return data;
    },
  });
  return { data, isLoading, error };
};
