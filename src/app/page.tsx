'use client';

import SessionCard from '@/components/session-card';
import { HomePageData } from '@/lib/api/user/types/home-page-data';
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
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {data.previous_sessions.map(
              (session: HomePageData['previous_sessions'][0]) => (
                <SessionCard key={session.session_name} session={session} />
              ),
            )}
          </div>
        )}
      </div>
    </>
  );
}
