import { useQuery } from '@tanstack/react-query';

import type { IUser } from '../types/types';

export const useGetUsers = () => {
  const { data, isPending, error } = useQuery<IUser>({
    //     IUser & { token: string },
    // { username: string; password: string }
    queryKey: ['users'],
    queryFn: () => fetch('https://dummyjson.com/auth/login').then((res) => res.json()),
  });
  return { data, isPending, error };
};
