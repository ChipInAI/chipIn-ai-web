'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableViewOptions } from './data-table-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { columnFilters } = table.getState();
  const isFiltered = columnFilters.length > 0;
  const sessionNameColumn = table.getColumn('session_name');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    sessionNameColumn?.setFilterValue(event.target.value);
  };

  const handleResetFilters = () => {
    table.resetColumnFilters();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name"
          value={(sessionNameColumn?.getFilterValue() as string) ?? ''}
          onChange={handleFilterChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
