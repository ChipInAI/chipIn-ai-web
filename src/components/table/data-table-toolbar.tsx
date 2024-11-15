'use client';

import { useState } from 'react';
import { Table } from '@tanstack/react-table';
import { PlusIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { CreateSession } from '../create-session';

import { DataTableViewOptions } from './data-table-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={
              (table.getColumn('session_name')?.getFilterValue() as string) ??
              ''
            }
            onChange={event =>
              table
                .getColumn('session_name')
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X />
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => setIsCreateSessionOpen(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Session
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <CreateSession
        isOpen={isCreateSessionOpen}
        setIsOpen={setIsCreateSessionOpen}
      />
    </>
  );
}
