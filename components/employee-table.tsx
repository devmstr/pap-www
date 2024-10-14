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
import { Dictionary, EmployeeEntry } from '@/types'
import { AUTH_ROLES } from '@/config/globals'
import { EmployeeBadge } from './employee-budge'
import { EmployeeTableActions } from './employee-table.actions'
import { useRouter, useSearchParams } from 'next/navigation'

interface EmployeeTableProps {
  t: Dictionary
  data: EmployeeEntry[]
  page: number
  per_page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function EmployeeTable({
  t,
  data,
  page,
  per_page,
  hasNextPage,
  hasPrevPage
}: EmployeeTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [limit, setLimit] = React.useState(per_page)
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const [searchText, setSearchText] = React.useState(search)

  React.useEffect(() => {
    const search = searchParams.get('search')
    const paramPrefix =
      search && search.length > 0 ? `?search=${searchText}&` : '?'
    table.setPageSize(limit)
    router.push(`${paramPrefix}per_page=${limit}`)
  }, [limit])

  React.useEffect(() => {
    if (!searchText) return
    const per_page = searchParams.get('per_page')
    const paramSuffix = per_page && +per_page > 10 ? `&per_page=${limit}` : ''
    router.push(`?search=${searchText}${paramSuffix}`)
  }, [searchText])

  function prevPage() {
    const search = searchParams.get('search')
    const paramPrefix =
      search && search.length > 0 ? `?search=${searchText}&` : '?'
    router.push(`${paramPrefix}page=${Number(page) - 1}&per_page=${limit}`, {
      scroll: false
    })
  }

  function nextPage() {
    const search = searchParams.get('search')
    const paramPrefix =
      search && search.length > 0 ? `?search=${searchText}&` : '?'
    router.push(`${paramPrefix}page=${Number(page) + 1}&per_page=${limit}`, {
      scroll: false
    })
  }

  const columns: ColumnDef<EmployeeEntry>[] = [
    {
      accessorKey: 'displayName',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t.columns['fullName']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Image
            width={430}
            height={430}
            src={row.original.image}
            alt={'employee-img-' + row.id}
            className="w-10 h-10 rounded-full object-cover object-center"
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <Link
                href={'/dashboard/profile/' + row.original.id}
                className="capitalize text-md font-medium hover:text-primary hover:underline"
              >
                {row.original.Profile.firstName} {row.original.Profile.lastName}
              </Link>
              {row.original.role !== AUTH_ROLES.EMPLOYEE && (
                <EmployeeBadge
                  role={row.original.role as 'MANAGER' | 'HR' | 'HRD' | 'CEO'}
                />
              )}
            </div>
            <div className="flex capitalize text-xs text-gray-500">
              {row.original.Positions[0]?.title}
            </div>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t.columns['email']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      )
    },
    {
      accessorKey: 'department',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-3 flex gap-2 hover:text-primary cursor-pointer"
          >
            {t.columns['department']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({
        row: {
          original: { Departments }
        }
      }) => <div className="capitalize">{Departments[0]?.name || 'ALL'}</div>
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return <EmployeeTableActions id={row.original.id} />
      }
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
          placeholder={t['search-by-name-or-email-or-department']}
          value={searchText ?? ''} // Use table.state.globalFilter to access the global filter value
          onChange={(event) => setSearchText(event.target.value)} // Use table.setGlobalFilter to update the global filter value
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
                        'p-0 py-1',
                        header.id === 'email' && 'hidden md:table-cell',
                        header.id === 'department' && 'hidden md:table-cell'
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
                          cell.column.id == 'department' &&
                            'hidden md:table-cell',
                          cell.column.id == 'email' && 'hidden md:table-cell'
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
            onClick={() => prevPage()}
            disabled={!hasPrevPage}
            className="select-none"
          >
            {t['previous']}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()}
            disabled={!hasNextPage}
            className="select-none"
          >
            {t['next']}
          </Button>
        </div>
      </div>
    </div>
  )
}
