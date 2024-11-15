import useGetSessionAdminQuery from '@/lib/service/query/use-get-session-admin';

const AdminEmailText = ({ sessionId }: { sessionId: string }) => {
  const { data } = useGetSessionAdminQuery({
    sessionId,
    enabled: !!sessionId,
  });

  if (!data) return null;

  return (
    <div className="flex space-x-2">
      <span className="max-w-[500px] truncate font-medium">
        {data.admin.email}
      </span>
    </div>
  );
};

export default AdminEmailText;
