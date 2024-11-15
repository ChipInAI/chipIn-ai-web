import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HomePageData } from '@/lib/api/user/types/home-page-data';

import { Badge } from './ui/badge';

const SessionCard = ({
  session,
}: {
  session: HomePageData['previous_sessions'][0];
}) => {
  const formattedDate = new Date(session.created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedStatus =
    session.status.charAt(0).toUpperCase() + session.status.slice(1);

  const nameParts = session.session_name.split(' - ');
  const formattedTitle =
    nameParts.length > 1 ? nameParts[2] : session.session_name;
  const description =
    nameParts.length > 1
      ? `(${new Date(nameParts[0]).toLocaleDateString('en-US')} to ${new Date(nameParts[1]).toLocaleDateString('en-US')})`
      : '';
  const receipt = session.receipt.map(item => item.join(' ')).join('\n');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{formattedTitle}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap text-xs text-muted-foreground">
        {receipt}
      </CardContent>
      <CardFooter className="flex w-full justify-between text-sm text-muted-foreground">
        <Badge variant="outline">{formattedStatus}</Badge>
        {formattedDate}
      </CardFooter>
    </Card>
  );
};

export default SessionCard;
