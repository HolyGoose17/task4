import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';

import { ProductSchema } from '../utils/types';

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
      const json = await res.json();
      const parsed = await ProductSchema.safeParseAsync(json);

      if (parsed.error instanceof ZodError) {
        console.error('Zod Error Details:', parsed.error);
        alert('Invalid data structure from backend');

        throw parsed.error;
      }

      return parsed.data;
    },

    staleTime: 1000 * 60 * 10,
  });
};
