'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const toggleColumnVisibility = (columnId: string, value: boolean) => {
    table.getColumn(columnId)?.toggleVisibility(value);
  };

  const renderColumnItems = () => {
    return table
      .getAllColumns()
      .filter(column => column.getCanHide() && column.accessorFn)
      .map(column => (
        <DropdownMenuCheckboxItem
          key={column.id}
          className="capitalize"
          checked={column.getIsVisible()}
          onCheckedChange={value => toggleColumnVisibility(column.id, !!value)}
        >
          {column.id.replace(/_/g, ' ')}
        </DropdownMenuCheckboxItem>
      ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderColumnItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
