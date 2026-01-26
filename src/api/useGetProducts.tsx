import { useQuery } from '@tanstack/react-query';

import type { Product } from '../utils/types';

interface IProductResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data: IProductResponse = await res.json();
      return data.products;
    },
    staleTime: 1000 * 60 * 10,
  });
};
