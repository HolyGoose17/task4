import { useQuery } from '@tanstack/react-query';

export const useApiQuery = ({
  queryKey,
  url,
  params,
  inter,
}: {
  queryKey: string[];
  url: string;
  params?: Record<string, unknown>;
  type?: unknown;
}) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(url, params);
      const data: inter = await res.json();
      return data;
    },
  });
};
