'use client';

import { AnalyticsCard } from '@/components/analytics-card';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <DataTable data={data?.previous_sessions || []} columns={columns} />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-bold">Recommendations</h1>
          <div className="text-sm text-muted-foreground">
            Check out our recommendations for you.
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md px-4 py-2">
          <div className="flex gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card className="h-[350px] w-[350px]" key={index}>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-bold">Analytics</h1>
          <div className="text-sm text-muted-foreground">
            This is a summary of your recent activity.
          </div>
        </div>
        <AnalyticsCard />
      </div>
    </div>
  );
}
