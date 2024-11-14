'use client';

import useGetUserSessionQuery from '@/lib/service/query/user-get-user-session-query';

export default function Page() {
  const { isLoading, data } = useGetUserSessionQuery({ enabled: true });
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 h-screen">
        {isLoading || !data ? (
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-muted/50" />
            ))}
          </div>
        ) : (
          <div className="h-full w-full text-center text-muted-foreground flex justify-center items-center text-xl font-medium">
            {data.previous_sessions.length}
          </div>
        )}
      </div>
    </>
  );
}
