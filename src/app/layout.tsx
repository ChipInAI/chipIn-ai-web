import type { Metadata } from 'next';

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
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
