'use client';

import { useParams } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useGetSessionQuery from '@/lib/service/query/use-get-session';
import useGetSessionAdminQuery from '@/lib/service/query/use-get-session-admin';

const Page = () => {
  const { id } = useParams() as { id: string };

  const { data } = useGetSessionQuery({
    sessionId: id,
    enabled: true,
  });

  const { data: adminData } = useGetSessionAdminQuery({
    sessionId: id,
    enabled: true,
  });

  if (!data) {
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="w-1/4 h-[25px]" />
        <main className="flex flex-col gap-5">
          <Section title="Main Information">
            <Skeleton className="w-1/4 h-[25px] my-2" />
            <Skeleton className="w-1/4 h-[25px] my-2" />
            <Skeleton className="w-1/4 h-[25px] my-2" />
            <Skeleton className="w-1/4 h-[25px] my-2" />
            <Skeleton className="w-1/4 h-[25px] my-2" />
            <Skeleton className="w-1/4 h-[25px] my-2" />
          </Section>
          <Section title="Bill Details">
            <div className="flex flex-col">
              <Skeleton className="w-1/4 h-[25px] my-2" />
              <Skeleton className="w-1/4 h-[25px] my-2" />
            </div>
          </Section>
        </main>
      </div>
    );
  }

  const formattedTitle = data.session_data.session_name.split(' - ')[2];

  return (
    <>
      <BreadcrumbComponent id={id} />
      <main className="flex flex-col gap-5">
        <Section title="Main Information">
          <InfoRow label="Name" value={formattedTitle} />
          <InfoRow label="Admin email" value={adminData?.admin.email} />
          <InfoRow label="Admin name" value={adminData?.admin.firstName} />
          <InfoRow label="Total" value={data.session_data.total} />
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
                label={`Position ${index + 1}`}
                value={`${position[1]} - ${position[2]}`}
              />
            ))}
          </div>
        </Section>
      </main>
    </>
  );
};

const BreadcrumbComponent = ({ id }: { id: string }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={`/session/${id}`}>{id}</BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

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
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-2 mt-2">
    <h1 className="text-md font-bold col-span-1">{label}</h1>
    <h1 className="col-span-1 md:col-span-4">{value}</h1>
  </div>
);

export default Page;
