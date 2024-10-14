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
import { ArrowUpDown, ChevronDown } from 'lucide-react'
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
import { CompanyUnitEntity, Dictionary } from '@/types'
import { toast } from '@/components/ui/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import useClientApi from '@/hooks/use-axios-auth'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

interface UnitsTableProps {
  data: CompanyUnitEntity[]
  apiEndpointUrl: string
  params: { lang: Locale }
  t?: Dictionary
  page: number
  per_page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function UnitsTable({
  apiEndpointUrl,
  data: initialData,
  params: { lang },
  t,
  page,
  hasNextPage,
  hasPrevPage
}: UnitsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [data, setData] = React.useState(initialData)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | undefined>()
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const { refresh } = useRouter()
  const api = useClientApi()

  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = React.useState('')

  React.useEffect(() => {
    router.push(`?search=`)
  }, [])
  React.useEffect(() => {
    if (!searchText) return
    router.push(`?search=${searchText}`)
  }, [searchText])

  function prevPage() {
    const search = searchParams.get('search')
    const paramPrefix = search
      ? search.length > 0 && `?search=${searchText}&`
      : '?'
    router.push(`${paramPrefix}page=${Number(page) - 1}`, {
      scroll: false
    })
  }

  function nextPage() {
    const search = searchParams.get('search')
    const paramPrefix = search
      ? search.length > 0 && `?search=${searchText}&`
      : '?'
    router.push(`${paramPrefix}page=${Number(page) + 1}`, {
      scroll: false
    })
  }

  const handleDelete = async (id: string | undefined) => {
    try {
      setIsDeleting(true)
      const { data: res } = await api.delete(apiEndpointUrl + id)
      setData(() => data.filter((i) => i.id != id))
      toast({
        title: 'Success!',
        description: <p>{res.message}</p>
      })
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

  const columns: ColumnDef<CompanyUnitEntity>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t['name']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue('name')}</div>
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
            {t['update-at']}
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
        <div className="flex justify-end px-3">
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
        pageSize: 8,
        pageIndex: 0
      }
    }
  })

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between gap-4 py-4">
        <Input
          placeholder={t['search-placeholder'] + '...'}
          value={searchText ?? ''} // Use table.state.globalFilter to access the global filter value
          onChange={(event) => setSearchText(event.target.value)} // Use table.setGlobalFilter to update the global filter value
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
                    <TableHead key={header.id} className={cn('p-0 py-1 pr-0')}>
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
                  {t['no-result']}.
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
