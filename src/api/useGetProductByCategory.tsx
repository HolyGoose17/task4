import { useQuery } from '@tanstack/react-query';

import type { Product } from '../utils/types';

interface IProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const useGetProductByCategory = (category?: string) => {
  return useQuery<Product[]>({
    queryKey: ['category', category],
    enabled: !!category,
    queryFn: async () => {
      const url = category
        ? `${import.meta.env.VITE_API_URL}/products/category/${category}`
        : `${import.meta.env.VITE_API_URL}/products`;
      const res = await fetch(url);
      const data: IProductsResponse = await res.json();
      return data.products;
    },
    staleTime: 1000 * 60 * 10,
  });
};
