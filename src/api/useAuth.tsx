import { useQuery } from '@tanstack/react-query';

import { getUser } from '../utils/auth';
import { getToken } from '../utils/jwt';

export const useAuth = () => {
  const { data: token } = useQuery({
    queryKey: ['auth-token'],
    queryFn: getToken,
    initialData: getToken(),
    staleTime: 1000 * 60 * 10,
  });

  const { data: user } = useQuery({
    queryKey: ['auth-user'],
    queryFn: getUser,
    initialData: getUser(),
    staleTime: 1000 * 60 * 10,
  });

  return {
    isAuth: !!token,
    token,
    user,
  };
};
