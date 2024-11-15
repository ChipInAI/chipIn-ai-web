import type { Metadata } from 'next';

import { NavUser } from '@/components/nav-user';
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
          <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Welcome back!
                </h2>
                <p className="text-muted-foreground">
                  Let&apos;s check your previous bills!
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <NavUser />
              </div>
            </div>
            {children}
          </div>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
