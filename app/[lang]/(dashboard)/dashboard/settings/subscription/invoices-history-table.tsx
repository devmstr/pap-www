'use client'

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import * as React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { InvoiceEntity } from '@/types'
import { PaymentStatus } from '@/components/payment-status'

export const columns: ColumnDef<InvoiceEntity>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
        >
          Invoice Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('id')}</div>
    )
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {new Date(row.getValue('date')).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })}
      </div>
    )
  },
  {
    accessorKey: 'via',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
        >
          Via
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('via')}</div>
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        <PaymentStatus variant={row.getValue('status')} />
      </div>
    )
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground font-bold">
        {row.getValue('amount') + ' ' + row.original.currency}
      </div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <div className="flex justify-center"></div>
  }
]

interface InvoicesHistoryTableProps {
  data: InvoiceEntity[]
  params: { lang: Locale }
}

export function InvoicesHistoryTable({
  data,
  params: { lang }
}: InvoicesHistoryTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility
    },
    initialState: {
      pagination: {
        pageIndex: 0
      }
    }
  })

  return (
    <div className="w-full mt-4">
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
                        'p-0 py-1 pr-0',
                        header.id === 'via' && 'hidden md:table-cell',
                        header.id === 'amount' && 'hidden md:table-cell',
                        header.id === 'status' && 'hidden md:table-cell'
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
                          'py-[0.5rem] pl-3 pr-0',
                          cell.column.id == 'via' && 'hidden md:table-cell',
                          cell.column.id == 'status' && 'hidden md:table-cell',
                          cell.column.id == 'amount' && 'hidden md:table-cell'
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
    </div>
  )
}
