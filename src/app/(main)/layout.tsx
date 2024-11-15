import { NavUser } from '@/components/nav-user';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
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
  );
}
