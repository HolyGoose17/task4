import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLoginMutation } from '../api/useLoginMutation';
import { auth } from '../app/auth';
import { Button } from '../modules/Button';
import { Input } from '../modules/Input';
import { saveUser } from '../utils/auth';
import { saveToken } from '../utils/jwt';

export const Route = createFileRoute('/authorize')({
  beforeLoad: () => {
    if (auth.isAuthenticated()) {
      throw redirect({
        to: '/',
      });
    }
  },

  component: AuthorizePage,
});

const AuthFormSchema = z.object({
  username: z
    .string()
    .min(4, 'Login is too short')
    .max(20, 'Login is too long. It is correct?')
    .trim(),
  password: z
    .string()
    .min(6, 'Password is too short')
    .max(24, 'Password is too long. Are you sure, you submit correct password?')
    .trim(),
});

type AuthForm = z.infer<typeof AuthFormSchema>;

interface IInputAuth {
  name: keyof AuthForm;
  placeholder: string;
  type: string;
}

const inputsAuth: IInputAuth[] = [
  { name: 'username', placeholder: 'Login', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
];

function AuthorizePage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isError } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: AuthForm) => {
    login(data, {
      onSuccess: (responseData) => {
        saveToken(responseData.accessToken);
        saveUser({ id: String(responseData.id), name: responseData.username });

        queryClient.setQueryData(['auth-token'], responseData.accessToken);
        queryClient.setQueryData(['auth-user'], responseData.username);

        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        alert('Success authorization');
        navigate({ to: '/' });
      },
    });
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center p-2">
      <div className="p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6">
        <h1 className="text-center text-2xl font-semibold">Authorization</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {inputsAuth.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              type={type}
              placeholder={placeholder}
              error={errors[name]?.message}
              {...register(name)}
            />
          ))}

          {isError && <div className="text-red-500 text-center">Invalid login or password</div>}

          <Button variant="primary" size="lg" type="submit">
            SIGN IN
          </Button>
        </form>

        <p className="text-center">
          Don't have an account? <Link to="/registration">Registration</Link>
        </p>
      </div>
    </div>
  );
}
