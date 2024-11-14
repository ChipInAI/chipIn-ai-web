'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';

import { Calendars } from '@/components/calendars';
import { DatePicker } from '@/components/date-picker';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import useUser from '@/hooks/use-user';

import { Skeleton } from './ui/skeleton';
import AuthModal from './auth-modal';
import { CreateSession } from './create-session';

// This is sample data.
const data = {
  user: {
    name: 'danyil.butov',
    email: 'danyil.butov@gmail.com',
    avatar: '/avatars/danyil.jpg',
  },
  sections: [
    {
      name: 'Session list',
      link: '/',
    },
    {
      name: 'Reccomendations',
      link: '/reccomendations',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isCreateSessionOpen, setIsCreateSessionOpen] = React.useState(false);
  const { isLoading, data: user } = useUser();

  if (!user && !isLoading) {
    return <AuthModal />;
  }

  return (
    <>
      {isLoading ? (
        <Sidebar {...props}>
          <SidebarHeader className="h-16 border-b border-sidebar-border">
            <Skeleton className="h-16 w-full aspect-square bg-muted/50" />
          </SidebarHeader>
          <SidebarContent>
            <Skeleton className="h-72 m-2 aspect-square bg-muted/50" />
            <SidebarSeparator className="mx-0 aspect-square" />
            <Skeleton className="h-8 m-2 aspect-square bg-muted/50" />
            <Skeleton className="h-8 m-2 aspect-square bg-muted/50" />
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Skeleton className="h-8 w-full aspect-square bg-muted/50" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      ) : (
        <>
          <Sidebar {...props}>
            <SidebarHeader className="h-16 border-b border-sidebar-border">
              <NavUser user={user!} />
            </SidebarHeader>
            <SidebarContent>
              <DatePicker />
              <SidebarSeparator className="mx-0" />
              <Calendars sections={data.sections} />
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setIsCreateSessionOpen(true)}
                  >
                    <Plus />
                    <span>New Session</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <CreateSession
            isOpen={isCreateSessionOpen}
            setIsOpen={setIsCreateSessionOpen}
          />
        </>
      )}
    </>
  );
}
