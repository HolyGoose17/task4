import { useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { useLoginMutation } from '../api/useLoginMutation';
import { Button } from '../modules/Button';
import { saveUser } from '../utils/auth';
import { saveToken } from '../utils/jwt';

export const Route = createLazyFileRoute('/authorize')({
  component: AuthorizePage,
});

function AuthorizePage() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate: login, isError } = useLoginMutation();

  const handleSubmit = () => {
    login(
      { username, password },
      {
        onSuccess: (data) => {
          const userData = {
            id: String(data.id),
            name: data.username,
          };
          saveToken(data.accessToken);
          saveUser(userData);

          queryClient.setQueryData(['auth-token'], data.accessToken);
          queryClient.setQueryData(['auth-user'], data.username);

          queryClient.invalidateQueries({ queryKey: ['auth-token'] });
          queryClient.invalidateQueries({ queryKey: ['auth-user'] });

          navigate({ to: '/' });
        },
      }
    );
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center p-2">
      <div className="p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6">
        <h1 className="text-center text-2xl font-semibold">Authorization</h1>

        <div className="flex flex-col gap-4">
          <input
            className="border rounded-sm h-14 px-3.5"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="border rounded-sm h-14 px-3.5"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isError && <div className="text-red-500 text-center">Invalid login or password</div>}

        <Button variant="primary" size="lg" onClick={handleSubmit}>
          SIGN IN
        </Button>

        <p className="text-center">
          Don't have an account? <Link to="/registration">Registration</Link>
        </p>
      </div>
    </div>
  );
}
