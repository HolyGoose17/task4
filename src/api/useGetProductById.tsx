import { useQuery } from '@tanstack/react-query';

import type { Product } from '../utils/types';

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
      const data: Product = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};
