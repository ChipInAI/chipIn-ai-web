'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useGetUserDataQuery from '@/lib/service/query/use-get-user-query';
import useLogoutUserUseCase from '@/lib/use-case/use-logout-user-use-case';

import { Skeleton } from './ui/skeleton';
import AuthModal from './auth-modal';
import UpdateForm from './update-form';

export function NavUser() {
  const { data, isLoading } = useGetUserDataQuery({ enabled: true });
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const logout = useLogoutUserUseCase({});
  const user = data?.user;

  if (isLoading) return <Skeleton className="h-9 w-9 rounded-full" />;

  if (!user) return <AuthModal />;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.firstName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsUpdateFormOpen(true)}>
            Update Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateForm open={isUpdateFormOpen} setOpen={setIsUpdateFormOpen} />
    </>
  );
}
