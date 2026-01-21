import { useMutation } from '@tanstack/react-query';

import type { IUser } from '../utils/types';

interface ILoginResponse {
  accessToken: string;
  id: number;
  username: string;
}
export const useLoginMutation = () => {
  return useMutation<ILoginResponse, Error, IUser>({
    mutationFn: async (body) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      return res.json();
    },
  });
};
