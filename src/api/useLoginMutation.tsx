import { useMutation } from '@tanstack/react-query';

import { type LoginResponse, LoginResponseScheme, type User } from '../utils/types';

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, User>({
    mutationFn: async (body) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }
      const json = await res.json();

      return LoginResponseScheme.parse(json);
    },
  });
};
