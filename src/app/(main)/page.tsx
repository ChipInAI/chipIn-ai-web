'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { AnalyticsCard } from '@/components/analytics-card';
import { CreateSession } from '@/components/create-session';
import RestaurantCard from '@/components/restaruant-card';
import SessionCard from '@/components/session-card';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import useGetUserSessionQuery from '@/lib/service/query/user-get-user-session-query';

const LoadingSkeleton = () => (
  <>
    <div className="flex h-12 items-center justify-between">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-24" />
    </div>
    <Skeleton className="h-96 w-full" />
    <Skeleton className="h-96 w-full" />
  </>
);

const SessionList = ({
  sessions,
}: {
  sessions: {
    _id: string;
    admin_id: string;
    created_at: string;
    participants: string[];
    receipt: Array<Array<string>>;
    session_name: string;
    session_positions: Array<
      | {
          buyer: string;
          item_name: string;
          price: number;
        }
      | unknown
    >;
    status: string;
    total: number;
  }[];
}) => (
  <ScrollArea className="w-full whitespace-nowrap rounded-md py-2">
    <div className="flex gap-4">
      {sessions.map((session, index) => (
        <SessionCard key={index} previousSession={session} />
      ))}
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

const Recommendations = ({
  recommendations,
}: {
  recommendations: {
    restaurant_name: string;
    review_count: number;
    stars: number;
    image_url: string;
  }[];
}) => (
  <div className="flex flex-col gap-4">
    <div>
      <h1 className="text-xl font-bold">Recommendations</h1>
      <div className="text-sm text-muted-foreground">
        Check out our recommendations for you.
      </div>
    </div>
    <ScrollArea className="w-full whitespace-nowrap rounded-md py-2">
      <div className="flex gap-4">
        {recommendations.slice(0, 5).map((recommendation, index) => (
          <RestaurantCard
            key={index}
            name={recommendation.restaurant_name}
            reviewCount={recommendation.review_count}
            rating={recommendation.stars}
            imageUrl={recommendation.image_url}
            features={Object.keys(recommendation).filter(
              key =>
                key !== 'restaurant_name' &&
                key !== 'image_url' &&
                recommendation[key as keyof typeof recommendation] === 1,
            )}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
);

export default function Page() {
  const { isLoading, data } = useGetUserSessionQuery({ enabled: true });
  const isMobile = useIsMobile();
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] =
    useState(false);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {!isMobile ? (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            <DataTable data={data?.previous_sessions || []} columns={columns} />
          ) : (
            <>
              <Button
                size="lg"
                onClick={() => setIsCreateSessionModalOpen(true)}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Create new session
              </Button>
              {data?.previous_sessions && (
                <SessionList sessions={data.previous_sessions} />
              )}
            </>
          )}
        </div>
        <Separator className="my-4" />
        <Recommendations recommendations={data?.recommendations || []} />
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
      <CreateSession
        isOpen={isCreateSessionModalOpen}
        setIsOpen={setIsCreateSessionModalOpen}
      />
    </>
  );
}
