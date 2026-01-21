import { useQuery } from '@tanstack/react-query';

import type { IProduct } from '../utils/types';

interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export const useGetProductByCategory = (category?: string) => {
  return useQuery<IProduct[]>({
    queryKey: ['category', category],
    queryFn: async () => {
      const url = category
        ? `${import.meta.env.VITE_API_URL}/products/category/${category}`
        : `${import.meta.env.VITE_API_URL}/products`;
      const res = await fetch(url);
      const data: IProductsResponse = await res.json();
      return data.products;
    },
  });
};
