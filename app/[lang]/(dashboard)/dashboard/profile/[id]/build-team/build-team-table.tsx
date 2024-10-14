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
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { cn, getLastAndNextFiveYears } from '@/lib/utils'
import { Dictionary, EmployeeEntry } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { useRouter } from 'next/navigation'
import { setYear } from 'date-fns'
import { EmployeeBadge } from '@/components/employee-budge'
import { AUTH_ROLES } from '@/config/globals'
import { EmployeeTableActions } from '@/components/employee-table.actions'

interface BuildTeamTableProps {
  data: EmployeeEntry[]
  t: Dictionary
  params: { lang: Locale; id: string }
}

export function BuildTeamTable({
  data,
  t,
  params: { lang, id }
}: BuildTeamTableProps) {
  const columns: ColumnDef<EmployeeEntry>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'displayName',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t?.columns['displayName']}
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
            className="w-10 h-10 rounded-full"
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
                <EmployeeBadge role={row.original.role} />
              )}
            </div>
            <div className="capitalize text-xs text-gray-500">
              {row.original.Positions[0].title}
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
            {t?.columns['email']}
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
            className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t?.columns['department']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.original.Departments[0].name}</div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <EmployeeTableActions id={row.original.id} />
        </div>
      )
    }
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [isJoining, setIsJoining] = React.useState(false)
  const [limit, setLimit] = React.useState(10)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const { refresh } = useRouter()
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const api = useClientApi()
  const handleJoinTeam = async () => {
    setIsJoining(true)
    const teamIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id)

    try {
      const { data } = await api.post('team/all', { bossId: id, teamIds })
      refresh()
    } catch (error) {
      console.error(error)
    } finally {
      table.toggleAllRowsSelected(false)
      setIsJoining(false)
    }
  }

  React.useEffect(() => {
    table.setPageSize(limit)
  }, [limit])

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
        <div className="flex gap-4 w-full">
          <Input
            placeholder={t['search-placeholder']}
            value={table.getState().globalFilter ?? ''} // Use table.state.globalFilter to access the global filter value
            onChange={(event) => table.setGlobalFilter(event.target.value)} // Use table.setGlobalFilter to update the global filter value
            className="max-w-sm"
          />
          <Button className="flex gap-2" onClick={handleJoinTeam}>
            {isJoining && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            {t['join-team']}
            <Icons.people className="w-5 h-5" />
          </Button>
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
                      {t.columns[column.id]}
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
                        'p-0 py-1 pr-0',
                        header.id === 'select' && 'pl-3 flex items-center',
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
