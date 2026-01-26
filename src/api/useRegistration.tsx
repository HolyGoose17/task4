import { useMutation } from '@tanstack/react-query';

import type { RegistrationForm } from '../utils/types';

export const useRegistration = () => {
  return useMutation({
    mutationFn: async (data: RegistrationForm) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed registration');
      return res.json();
    },
  });
};
