'use client';

import { Row } from '@tanstack/react-table';
import { LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface DataTableRowActionsProps<TData extends { _id: string }> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends { _id: string }>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  return (
    <Button
      variant="link"
      className="text-muted-foreground h-2 w-2 flex justify-center items-center"
      onClick={() => {
        router.push(`/session/${row.original._id}`);
      }}
    >
      <LinkIcon />
    </Button>
  );
}
