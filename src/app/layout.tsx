import { Separator } from '@radix-ui/react-separator';
import type { Metadata } from 'next';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from '@/providers/react-query';

import './globals.css';

export const metadata: Metadata = {
  title: 'chipin.ai',
  description: 'calculate your bill with ai',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body>
        <ReactQueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
