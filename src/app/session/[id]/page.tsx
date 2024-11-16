'use client';

import { useParams } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useGetSessionQuery from '@/lib/service/query/use-get-session';
import useGetSessionAdminQuery from '@/lib/service/query/use-get-session-admin';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h1 className="text-lg font-bold pb-2 mt-6">{title}</h1>
    <Separator />
    {children}
  </div>
);

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-2 mt-2">
    <h1 className="text-md col-span-1">{label}</h1>
    <h1 className="col-span-2 md:col-span-4 text-muted-foreground">{value}</h1>
  </div>
);

const PageSkeleton = () => (
  <div className="flex flex-col gap-5">
    <main className="flex flex-col gap-5">
      {['Main Information', 'Bill Details', 'User Information', 'Total'].map(
        (title, index) => (
          <Section key={index} title={title}>
            {Array.from({ length: title === 'Total' ? 1 : 5 }, (_, i) => (
              <Skeleton key={i} className="w-1/4 h-[25px] my-2" />
            ))}
          </Section>
        ),
      )}
    </main>
  </div>
);

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetSessionQuery({ sessionId: id, enabled: true });
  const { data: adminData } = useGetSessionAdminQuery({
    sessionId: id,
    enabled: true,
  });

  if (!data || !adminData) {
    return <PageSkeleton />;
  }

  const formattedTitle = data.session_data.session_name.split(' - ')[2];

  return (
    <main className="flex flex-col gap-5">
      <Section title="Main Information">
        <InfoRow label="Name" value={formattedTitle} />
        <InfoRow label="Admin email" value={adminData.admin.email} />
        <InfoRow label="Admin name" value={adminData.admin.firstName} />
        <InfoRow
          label="Created at"
          value={new Date(data.session_data.created_at).toLocaleDateString()}
        />
      </Section>
      <Section title="Bill Details">
        <div className="flex flex-col">
          {data.session_data.receipt.slice(1).map((position, index) => (
            <InfoRow
              key={index}
              label={position[1]}
              value={`${position[2]} x (${position[0]})`}
            />
          ))}
        </div>
      </Section>
      <Section title="User Information">
        {data.session_data.positions.map((position, index) =>
          position.buyer === data.session_data.admin_id ? (
            <InfoRow
              key={index}
              label={position.item_name}
              value={`£${position.price}`}
            />
          ) : null,
        )}
      </Section>
      <Section title="Total">
        <InfoRow label="Total" value={`£${data.session_data.total}`} />
        <InfoRow
          label="Total for person"
          value={`£${data.session_data.total_for_person}`}
        />
      </Section>
    </main>
  );
};

export default Page;
