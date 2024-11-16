'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { UpdateUserSettingsBody } from '@/lib/api/user/types/update-user-settings';
import useGetUserDataQuery from '@/lib/service/query/use-get-user-query';
import useUpdateUserSettingsUseCase from '@/lib/use-case/use-update-user-settings-use-case';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'First name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirm_password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
});

const UpdateForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { data, isLoading } = useGetUserDataQuery({ enabled: true });
  const { toast } = useToast();
  const { updateUserSettings } = useUpdateUserSettingsUseCase({
    onSuccess: () => {
      setOpen(false);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    },
  });
  const { register, handleSubmit, reset } = useForm<UpdateUserSettingsBody>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: UpdateUserSettingsBody) => {
    await updateUserSettings(formData);
    reset();
  };

  return isLoading ? (
    <Skeleton className="h-96 w-full" />
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mx-auto max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-2xl">Update Profile</DialogTitle>
            <DialogDescription>
              Update your account information below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <div className="grid gap-2">
              <Input {...register('email')} placeholder={data?.user.email} />
              <p className="text-xs text-muted-foreground ml-1">
                Your email is visible to other users
              </p>
            </div>
            <div className="grid gap-2">
              <Input
                {...register('firstName')}
                placeholder={data?.user.firstName}
              />
            </div>
            <div className="grid gap-2">
              <Input
                type="password"
                {...register('password')}
                placeholder="Password"
              />
            </div>
            <div className="grid gap-2">
              <Input
                type="password"
                {...register('confirm_password')}
                placeholder="Repeat Password"
              />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? 'Updating' : 'Update'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
