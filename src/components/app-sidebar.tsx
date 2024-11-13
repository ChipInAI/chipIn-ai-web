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
    {
      name: 'Analytics',
      link: '/analytics',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isCreateSessionOpen, setIsCreateSessionOpen] = React.useState(false);

  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader className="h-16 border-b border-sidebar-border">
          <NavUser user={data.user} />
        </SidebarHeader>
        <SidebarContent>
          <DatePicker />
          <SidebarSeparator className="mx-0" />
          <Calendars sections={data.sections} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setIsCreateSessionOpen(true)}>
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
  );
}
