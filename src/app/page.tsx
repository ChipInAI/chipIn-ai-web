'use client';

import { AnalyticsCard } from '@/components/analytics-card';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import useGetUserSessionQuery from '@/lib/service/query/user-get-user-session-query';
export default function Page() {
  const { isLoading, data } = useGetUserSessionQuery({ enabled: true });

  return isLoading ? (
    <>
      <div className="flex h-12 items-center justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-96 w-full" />
      <div>
        <Skeleton className="h-96 w-full" />
      </div>
    </>
  ) : (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <DataTable data={data?.previous_sessions || []} columns={columns} />
      <AnalyticsCard />
    </>
  );
}
