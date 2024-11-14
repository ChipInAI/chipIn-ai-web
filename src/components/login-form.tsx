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
import useLoginUserUseCase from '@/lib/use-case/use-login-user-use-case';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export function LoginForm({
  handleModalChange,
}: {
  handleModalChange: () => void;
}) {
  const { loginUser, isLoading } = useLoginUserUseCase({});

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    await loginUser(data);
  };

  return (
    <Dialog open>
      <DialogContent className="mx-auto max-w-sm" closeButton={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-2xl">Login</DialogTitle>
            <DialogDescription>
              Enter your email below to login to your account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
              />
            </div>
            <div className="grid gap-2">
              <Input id="password" type="password" {...register('password')} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Login
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <button className="underline" onClick={handleModalChange}>
            Sign up
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
