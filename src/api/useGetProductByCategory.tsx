import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';

import { ProductsResponseSchema } from '../utils/types';

export const useGetProductByCategory = (category?: string) => {
  return useQuery({
    queryKey: ['category', category],
    enabled: !!category,
    queryFn: async () => {
      const url = category
        ? `${import.meta.env.VITE_API_URL}/products/category/${category}`
        : `${import.meta.env.VITE_API_URL}/products`;

      const res = await fetch(url);
      const json = await res.json();
      const parsed = ProductsResponseSchema.safeParseAsync(json);

      parsed.catch((error) => {
        if (error instanceof ZodError) {
          alert('Invalid products data by category');
        }
      });

      return (await parsed).data?.products;
    },
    staleTime: 1000 * 60 * 10,
  });
};
