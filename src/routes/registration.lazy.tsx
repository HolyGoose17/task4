import { createLazyFileRoute } from '@tanstack/react-router';

import { Button } from '../modules/Button';
import { Input } from '../modules/Input';

export const Route = createLazyFileRoute('/registration')({
  component: RouteComponent,
});

function RouteComponent() {
  const inputs = [
    { placeholder: 'Login', type: 'text' },
    { placeholder: 'Email', type: 'email' },
    { placeholder: 'Phone', type: 'text' },
    { placeholder: 'Password', type: 'password' },
    { placeholder: 'Repeat password', type: 'password' },
  ];
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-dvh flex items-center justify-center p-2 ">
      <div className="p-8 w-full max-w-116 rounded-xl  flex flex-col shadow-paper gap-6">
        <h1 className="text-center text-2xl font-semibold tracking-tight">Registration</h1>

        <div className="flex flex-col gap-4">
          {inputs.map((inp) => (
            <Input placeholder={inp.placeholder} type={inp.type} key={inp.placeholder} />
          ))}
        </div>
        <Button variant="primary" size="lg" type="submit">
          SIGN UP
        </Button>
      </div>
    </div>
  );
}
