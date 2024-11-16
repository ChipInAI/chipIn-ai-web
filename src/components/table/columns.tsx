'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { HomePageData } from '@/components/table/data/schema';
import { Badge } from '@/components/ui/badge';

import AdminEmailText from './components/admin-email-text';
import { DataTableColumnHeader } from './data-column-header';
import { DataTableRowActions } from './data-row-action';

export const columns: ColumnDef<HomePageData>[] = [
  {
    accessorKey: 'admin_email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Admin" />
    ),
    cell: ({ row }) => {
      const sessionId = row.original._id;

      return <AdminEmailText sessionId={sessionId} />;
    },
  },
  {
    accessorKey: 'session_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const name = row.getValue('session_name') as string;

      const nameParts = name.split(' - ');
      const formattedTitle = nameParts.length > 2 ? nameParts[2] : name;

      return (
        <div className="flex space-x-2">
          {status && <Badge variant="outline">{status}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {formattedTitle}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('created_at') as string;

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium text-muted-foreground">
            {format(new Date(createdAt), 'MMM d, yyyy')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'session_positions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => {
      const sessionPositions = row.getValue('session_positions') as {
        item_name: string;
        price: number;
      }[];

      if (sessionPositions == null) {
        return null;
      }

      return (
        <div className="flex flex-col">
          {sessionPositions.map((position, index) => {
            if (
              typeof position === 'object' &&
              position.item_name &&
              position.price
            ) {
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-muted-foreground text-sm"
                >
                  <span>{position.item_name}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'total_price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => {
      const sessionPositions = row.getValue('session_positions') as {
        item_name: string;
        price: number;
      }[];

      if (sessionPositions == null) {
        return null;
      }

      const totalPrice = sessionPositions.reduce((sum, position) => {
        if (typeof position === 'object' && position.price) {
          return sum + position.price;
        }
        return sum;
      }, 0);

      return <div className="text-bold text-sm">${totalPrice.toFixed(2)}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
