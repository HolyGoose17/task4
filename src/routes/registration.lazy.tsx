import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { useRegistration } from '../api/useRegistration';
import { Button } from '../modules/Button';
import { Input } from '../modules/Input';
import type { IIRegistrationForm } from '../utils/types';

export const Route = createLazyFileRoute('/registration')({
  component: RouteComponent,
});

function RouteComponent() {
  interface IInputConfig {
    name: keyof IIRegistrationForm;
    placeholder: string;
    type: string;
  }

  const inputs: IInputConfig[] = [
    { name: 'login', placeholder: 'Login', type: 'text' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'phone', placeholder: 'Phone', type: 'text' },
    { name: 'password', placeholder: 'Password', type: 'password' },
    { name: 'repeatPassword', placeholder: 'Repeat password', type: 'password' },
  ];

  const navigate = useNavigate();

  const [form, setForm] = useState<IIRegistrationForm>({
    login: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
  });
  const { mutate: registration, isError } = useRegistration();

  const updateField = (field: keyof IIRegistrationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormComplete = useMemo(() => {
    return Object.values(form).every((value) => value.trim() !== '');
  }, [form]);

  const handleSubmit = () => {
    if (!isFormComplete) {
      alert('Please fill in all fields');
      return;
    }

    if (form.password !== form.repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    registration(form);
    alert('Success registration');
    navigate({ to: '/' });
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-dvh flex items-center justify-center p-2 ">
      <div className="p-8 w-full max-w-116 rounded-xl  flex flex-col shadow-paper gap-6">
        <h1 className="text-center text-2xl font-semibold tracking-tight">Registration</h1>

        <div className="flex flex-col gap-4">
          {inputs.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              placeholder={placeholder}
              type={type}
              value={form[name]}
              onChange={(value) => updateField(name, value)}
            />
          ))}
        </div>
        {isError && <div className="text-red-500 text-center">Registration was failed</div>}
        <Button variant="primary" size="lg" type="submit" onClick={handleSubmit}>
          SIGN UP
        </Button>
      </div>
    </div>
  );
}
