import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { useRegistration } from '../api/useRegistration';
import { auth } from '../app/auth';
import { Button } from '../modules/Button';
import { Input } from '../modules/Input';
import type { RegistrationForm } from '../utils/types';

export const Route = createFileRoute('/registration')({
  beforeLoad: () => {
    if (auth.isAuthenticated()) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RouteComponent,
});

interface IInputConfig {
  name: keyof RegistrationForm;
  placeholder: string;
  type: string;
}

const inputsReg: IInputConfig[] = [
  { name: 'login', placeholder: 'Login', type: 'text' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'phone', placeholder: 'Phone', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
  { name: 'repeatPassword', placeholder: 'Repeat password', type: 'password' },
];

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: registration, isError } = useRegistration();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegistrationForm>({
    defaultValues: {
      login: '',
      email: '',
      phone: '',
      password: '',
      repeatPassword: '',
    },
  });

  const validationRules = {
    login: { required: 'This field is required' },
    email: {
      required: 'This field is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email address',
      },
    },
    phone: {
      required: 'This field is required',
      pattern: {
        value: /^\+?[1-9][0-9]{7,14}$/,
        message: 'Invalid phone number',
      },
    },
    password: { required: 'This field is required' },
    repeatPassword: {
      required: 'This field is required',
      validate: (value: string) => value === getValues('password') || 'Passwords do not match',
    },
  };

  const onSubmit = (data: RegistrationForm) => {
    registration(data, {
      onSuccess: () => {
        alert('Success registration');
        navigate({ to: '/' });
      },
    });
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-dvh flex items-center justify-center p-2 ">
      <div className="p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6">
        <h1 className="text-center text-2xl font-semibold tracking-tight">Registration</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {inputsReg.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              type={type}
              placeholder={placeholder}
              error={errors[name]?.message}
              {...register(name, validationRules[name])}
            />
          ))}

          {isError && (
            <div className="text-red-500 text-center text-sm font-medium">
              Registration failed. Please try again.
            </div>
          )}

          <Button variant="primary" size="lg" type="submit">
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
}
