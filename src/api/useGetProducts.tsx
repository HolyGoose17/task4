import { useQuery } from '@tanstack/react-query';

import type { IProduct } from '../utils/types';

interface IProductResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export const useGetProducts = () => {
  return useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data: IProductResponse = await res.json();
      return data.products;
    },
  });
};
