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
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
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
import { cn, getLastAndNextFiveYears } from '@/lib/utils'
import { Dictionary, IdpEntry } from '@/types'
import { format } from 'date-fns'
import Link from 'next/link'
import { IdpTableActions } from './idps-table.actions'
import { StatusBudge, StatusVariant } from './status-budge'
import { Progress } from './ui/progress'

interface IdpTableProps {
  t: Dictionary
  data: IdpEntry[]
}

export function IdpTable({ t, data }: IdpTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [limit, setLimit] = React.useState(10)

  const [year, setYear] = React.useState<string>(
    new Date().getFullYear().toString()
  )

  const [idps, setIdps] = React.useState<IdpEntry[]>(
    data.filter((idps) => idps.plan === year)
  )

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  React.useEffect(() => {
    setIdps(data.filter((idps) => idps.plan === year))
  }, [data])

  React.useEffect(() => {
    table.setPageSize(limit)
  }, [limit])

  React.useEffect(() => {
    if (year === 'ALL') setIdps(data)
    else setIdps(data.filter((idps) => idps.plan === year))
  }, [year])

  const columns: ColumnDef<IdpEntry>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <div
            className="flex gap-2 hover:text-primary  cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t.columns['title']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      }
    },
    {
      accessorKey: 'duration',
      header: ({ column }) => {
        return (
          <div
            className="flex gap-2 hover:text-primary  cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t.columns['duration']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      }
    },
    {
      accessorKey: 'participant',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t.columns['participant']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <Link
          className="flex items-center hover:text-primary hover:underline"
          href={'/dashboard/profile/' + row.original.Auth?.id}
        >
          {row.original.Auth?.displayName}
        </Link>
      )
    },
    {
      accessorKey: 'status',
      header: t.columns['status'],
      cell: ({ row }) => (
        <StatusBudge
          variant={row.original.status?.toLowerCase() as StatusVariant}
        />
      )
    },
    {
      accessorKey: 'deadline',
      header: ({ column }) => {
        return (
          <div
            className="flex gap-2 hover:text-primary  cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t.columns['deadline']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="flex items-center">
          {format(new Date(row.original.endDate || ''), 'dd/MM/yyyy')}
        </div>
      )
    },
    {
      accessorKey: 'score',
      header: ({ column }) => {
        return (
          <div
            className="flex gap-2 hover:text-primary  cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t.columns['progress']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-1">
          <Progress
            value={row.original.progress}
            className="h-[0.65rem] max-w-10"
          />
          <span
            className={cn(
              row.original.progress > 80 && 'text-green-500',
              row.original.progress <= 80 && 'text-yellow-500',
              row.original.progress <= 60 && 'text-orange-500',
              row.original.progress <= 20 && 'text-red-500',
              row.original.progress == 0 && 'text-gray-500'
            )}
          >
            {row.original.progress + '%'}
          </span>
        </div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => <IdpTableActions id={row.original.id} />
    }
  ]

  const table = useReactTable({
    data: idps,
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
    <div className="">
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-3 w-full">
          <Input
            placeholder={t['search-by-title-or-category-or-participent']}
            value={table.getState().globalFilter ?? ''} // Use table.state.globalFilter to access the global filter value
            onChange={(event) => table.setGlobalFilter(event.target.value)} // Use table.setGlobalFilter to update the global filter value
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="    text-muted-foreground hover:text-foreground"
              >
                {t.selectors.plan['year']}{' '}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuRadioGroup value={year} onValueChange={setYear}>
                <DropdownMenuRadioItem
                  className="text-muted-foreground font-medium hover:text-primary"
                  value={'ALL'}
                >
                  {t.selectors.plan['all']}
                </DropdownMenuRadioItem>
                {getLastAndNextFiveYears().map((year) => (
                  <DropdownMenuRadioItem
                    className={cn(
                      'text-muted-foreground font-medium hover:text-primary',
                      year === new Date().getFullYear().toString() &&
                        'text-primary'
                    )}
                    key={year}
                    value={year}
                  >
                    {year}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
        <Table className="w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.id === 'duration' && 'hidden lg:table-cell',
                        header.id === 'trainer' && 'hidden md:table-cell',
                        header.id === 'status' && 'hidden md:table-cell',
                        header.id === 'deadline' && 'hidden md:table-cell'
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
                    if (
                      cell.column.id === 'duration' ||
                      cell.column.id === 'trainer' ||
                      cell.column.id === 'status' ||
                      cell.column.id === 'deadline'
                    ) {
                      if (cell.column.id === 'duration')
                        return (
                          <TableCell
                            key={cell.id}
                            className="hidden lg:table-cell"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )
                      return (
                        <TableCell
                          key={cell.id}
                          className="hidden md:table-cell"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'py-2 px-3 overflow-hidden whitespace-nowrap text-ellipsis',
                          cell.column.id === 'score' && 'w-4 ',
                          cell.column.id === 'title' && 'max-w-10 md:max-w-fit '
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
                  className="h-24 text-center "
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
