'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useRegistrationUserUseCase from '@/lib/use-case/use-registration-user-use-case';

const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(1, 'First name is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function RegisterForm({
  handleModalChange,
}: {
  handleModalChange: () => void;
}) {
  const { registerUser, isLoading } = useRegistrationUserUseCase();

  const { register, handleSubmit } = useForm<{
    email: string;
    firstName: string;
    password: string;
    confirmPassword: string;
  }>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: {
    email: string;
    firstName: string;
    password: string;
    confirmPassword: string;
  }) => {
    await registerUser(data);
  };

  return (
    <Dialog open>
      <DialogContent className="mx-auto max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign up</DialogTitle>
          <DialogDescription>
            Enter your email below to create an account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="firstName">First Name</Label>
              </div>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register('firstName')}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                {...register('password')}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm password</Label>
              </div>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Sign up
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <button className="underline" onClick={handleModalChange}>
            Sign in
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
