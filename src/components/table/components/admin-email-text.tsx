import { Skeleton } from '@/components/ui/skeleton';
import useGetSessionAdminQuery from '@/lib/service/query/use-get-session-admin';

const AdminEmailText = ({ sessionId }: { sessionId: string }) => {
  const { data, isLoading } = useGetSessionAdminQuery({
    sessionId,
    enabled: !!sessionId,
  });

  if (isLoading) return <Skeleton className="w-[120px] h-[25px]" />;

  if (!data) return null;

  return (
    <div className="flex space-x-2">
      <span className="max-w-[500px] truncate font-medium overflow-hidden">
        {data.admin.email}
      </span>
    </div>
  );
};

export default AdminEmailText;
