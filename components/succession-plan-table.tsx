'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Dictionary, SuccessionEntry } from '@/types'
import { SuccessionTableActions } from './succession-table.actions'

interface SuccessionTableProps {
  t: Dictionary
  data: SuccessionEntry[]
  pageSize?: number
}

export function SuccessionTable({ t, data, pageSize }: SuccessionTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [limit, setLimit] = React.useState(10)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const columns: ColumnDef<SuccessionEntry>[] = [
    {
      accessorKey: 'fullName',
      header: ({ column }) => {
        return (
          <div className="flex items-center h-full">
            <div
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
              className="flex items-center cursor-pointer hover:text-primary hover:underline"
            >
              {t.columns['full-name']}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Image
            width={430}
            height={430}
            src={row.original.Candidate.image}
            alt={'employee-img-' + row.id}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <Link
              href={'/dashboard/profile/' + row.original.Candidate.id}
              className="capitalize text-md font-medium hover:text-primary hover:underline"
            >
              {row.original.Candidate.displayName}
            </Link>
            <div className="capitalize text-xs text-muted-foreground">
              {row.original.Position.title}
            </div>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'readiness',
      header: ({ column }) => {
        return (
          <div className="flex items-center h-full">
            <div
              className="flex gap-1 cursor-pointer hover:text-primary hover:underline"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t.columns['readiness']}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase flex flex-col ">
          <span className="capitalize font-medium">
            {row.getValue('readiness')}
          </span>
          <span className="capitalize text-xs text-muted-foreground">
            {t['ranking'] + ' ' + row.original.ranking}
          </span>
        </div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <SuccessionTableActions id={row.original.id} />
        </div>
      )
    }
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    initialState: {
      pagination: {
        pageSize: limit,
        pageIndex: 0
      }
    }
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder={t['search-by-name']}
          value={table.getState().globalFilter ?? ''} // Use table.state.globalFilter to access the global filter value
          onChange={(event) => table.setGlobalFilter(event.target.value)} // Use table.setGlobalFilter to update the global filter value
          className="max-w-sm"
        />
        <div className="hidden md:flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                {t.selectors['columns']}{' '}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-muted-foreground hover:text-foreground "
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="
                text-muted-foreground hover:text-foreground
              "
              >
                {t.selectors['limit']} ({limit}){' '}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={limit.toString()}
                onValueChange={(value) => setLimit(parseInt(value))}
              >
                {['10', '25', '50', '100'].map((value) => (
                  <DropdownMenuRadioItem
                    className={cn(
                      'text-muted-foreground font-medium hover:text-primary',
                      limit === parseInt(value) && 'text-primary'
                    )}
                    key={value}
                    value={value}
                  >
                    {value}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.id == 'readiness' && 'hidden md:block'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cell.column.id == 'readiness' && 'hidden md:block',
                          cell.column.id == 'fullName' && 'py-[0.3rem] px-4',
                          cell.column.id == 'actions' && 'py-[0.3rem] px-4'
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t['previous']}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t['next']}
          </Button>
        </div>
      </div>
    </div>
  )
}
