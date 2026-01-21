import { useQuery } from '@tanstack/react-query';

import type { IProduct } from '../utils/types';

export const useGetProductById = (id: number) => {
  return useQuery<IProduct>({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
      const data: IProduct = await res.json();
      return data;
    },
  });
};
