'use client';

import AuthModal from '@/components/auth-modal';
import useUser from '@/hooks/use-user';

export default function Page() {
  const { isLoading, data } = useUser();

  if (!data && !isLoading) {
    return <AuthModal />;
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-5">
          {isLoading ? (
            Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-muted/50" />
            ))
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>
    </>
  );
}
