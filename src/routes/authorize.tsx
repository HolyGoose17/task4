import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { useGetUsers } from '../api/useGetUsers';

export const Route = createFileRoute('/authorize')({
  component: AuthorizePage,
});

function AuthorizePage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { data, error, isPending } = useGetUsers();
  const navigate = useNavigate();
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-dvh flex items-center justify-center p-2 ">
      <div className="p-8 w-full max-w-116 rounded-xl  flex flex-col shadow-paper gap-6">
        <div className="">
          <h1 className="text-center text-2xl font-semibold tracking-tight">Authorization</h1>
        </div>
        <div className="flex flex-col gap-4">
          <input
            className="border rounded-sm border-gray-400 focus:border-blue-400 focus:outline-none focus:border-2 hover:border-black w-100 h-14 py-4 px-3.5"
            placeholder="User Name"
            onChange={(event) => setLogin(event.target.value)}
          />
          <input
            className="border rounded-sm border-gray-400 focus:border-blue-400 focus:outline-none focus:border-2 hover:border-black w-100 h-14 py-4 px-3.5"
            placeholder="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className="bg-blue rounded-sm py-2 px-8 shadow-btn cursor-pointer hover:bg-blue-hover text-md"
          type="submit"
        >
          SIGN IN
        </button>
        <p className="text-base tracking-tighter text-center">
          Don't have an account? <Link to="/registration">Let's registration</Link>
        </p>
      </div>
    </div>
  );
}
