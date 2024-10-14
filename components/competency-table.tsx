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
import { cn } from '@/lib/utils'
import { CompetencyEntry, EmployeePasswordsEntry } from '@/types'
import { Locale } from '@/i18n.config'
import { useRouter } from 'next/navigation'
import useClientApi from '@/hooks/use-axios-auth'
import { toast } from './ui/use-toast'
import { Icons } from './icons'
import Link from 'next/link'
import { Dictionary } from '@/types'

interface CompetencyTableProps {
  data: CompetencyEntry[]
  params: { lang: Locale }
  t: Dictionary
}

export function CompetencyTable({
  data: initialData,
  t,
  params: { lang }
}: CompetencyTableProps) {
  const [data, setData] = React.useState(initialData)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | undefined>()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const { refresh, back } = useRouter()
  const api = useClientApi()

  const handleDelete = async (id: string | undefined) => {
    try {
      setIsDeleting(true)
      await api.delete('competency/' + id)
      setData(() => data.filter((i) => i.id != id))
      refresh()
    } catch (error: any) {
      toast({
        title: 'Error Occurred!',
        description: <p>{error.response.data.error}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

  const columns: ColumnDef<CompetencyEntry>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t.columns['competency']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => <div className="">{row.original.name}</div>
    },
    {
      accessorKey: 'sector',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t.columns['sector']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase max-w-xs truncate">
          {row.original.Sectors.map((s) => s.title).join(', ')}
        </div>
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
            {t.columns['update-at']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {new Date(row.original?.updatedAt || '').toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          })}
        </div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({
        row: {
          original: { id }
        }
      }) => (
        <div className="flex gap-2 justify-end px-3">
          <Link
            href={'/dashboard/settings/customization/competencies/' + id}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'text-muted-foreground hover:text-primary focus:ring-primary  hover:border-primary group'
            )}
          >
            <Icons.expend className="h-3 w-3  text-muted-foreground/80 group-hover:text-primary" />
          </Link>
          <Button
            variant={'outline'}
            className={cn(
              'text-muted-foreground hover:text-red-500 focus:ring-red-500  hover:border-red-500'
            )}
            onClick={() => {
              setDeletingId(id)
              handleDelete(id)
            }}
          >
            {isDeleting && deletingId == id ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="h-4 w-4" />
            )}
          </Button>
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
        pageSize: 7,
        pageIndex: 0
      }
    }
  })

  return (
    <div className="w-full px-1">
      <div className="flex items-center justify-between gap-4 py-4">
        <Input
          placeholder={t['search-placeholder']}
          value={table.getState().globalFilter ?? ''} // Use table.state.globalFilter to access the global filter value
          onChange={(event) => table.setGlobalFilter(event.target.value)} // Use table.setGlobalFilter to update the global filter value
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={cn('p-0 py-1')}>
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
                        className={cn('py-[0.5rem] pl-3 pr-0')}
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
