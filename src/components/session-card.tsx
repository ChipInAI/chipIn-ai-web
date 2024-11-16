import { Key } from 'react';
import { format } from 'date-fns';
import { ArrowRight, Calendar, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { HomePageData } from './table/data/schema';

export default function SessionCard({
  previousSession,
}: {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  previousSession: HomePageData['previous_sessions'][0];
}) {
  const formattedTitle = previousSession.session_name.split(' - ')[2];
  return (
    <Card className="w-[300px] lg:w-[450px] max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{formattedTitle}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1" />
          {format(new Date(previousSession.created_at), 'MMM d, yyyy')}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 rounded-md border p-4">
          <div className="space-y-4">
            {previousSession.receipt
              .slice(1)
              .map((position: number[], index: Key | null | undefined) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{position[1]}</span>
                    <span className="text-xs text-muted-foreground">
                      x{position[0]}
                    </span>
                  </div>
                  <span className="text-xs">{position[2]}</span>
                </div>
              ))}
          </div>
        </ScrollArea>
        <Separator className="my-4" />
        <div className="flex justify-between items-center font-semibold">
          <span>Total</span>
          <span>£{previousSession.total}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/session/${previousSession._id}`}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 px-4 rounded-md transition-colors flex justify-between items-center"
        >
          <span>View Session Details</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
