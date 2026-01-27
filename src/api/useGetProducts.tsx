import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';

import { ProductsResponseSchema } from '../utils/types';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const json = await res.json();

      const parsed = await ProductsResponseSchema.safeParseAsync(json);

      if (parsed.error instanceof ZodError) {
        console.error('Zod Error Details:', parsed.error);
        alert('Invalid data structure from backend');

        throw parsed.error;
      }

      return parsed.data?.products;
    },
    staleTime: 1000 * 60 * 10,
  });
};
