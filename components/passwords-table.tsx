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
import { Dictionary, EmployeePasswordsEntry } from '@/types'
import { AxiosError } from 'axios'
import { Icons } from './icons'
import { InfoWrapper } from './troplit'
import { toast } from './ui/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { ScrollArea } from './ui/scroll-area'

interface PasswordsTableProps {
  data: EmployeePasswordsEntry[]
  t?: Dictionary
  page: number
  per_page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function PasswordsTable({
  t,
  data,
  page,
  per_page,
  hasNextPage,
  hasPrevPage
}: PasswordsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [sendingId, setSendingId] = React.useState('')
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [limit, setLimit] = React.useState(per_page)
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = React.useState('')

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

  const sendCheckInEmail = async (email: string) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/email/checkin', {
        body: JSON.stringify({
          email
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      if (!res?.ok) {
        const error = await res.json()
        throw new Error(error)
      }

      toast({
        title: 'Success!',
        description: <p>Your check-in email has been send successfully</p>
      })
    } catch (error: any) {
      if (error instanceof AxiosError)
        toast({
          title: 'Success!',
          description: <p>{error.response?.data.error}</p>,
          variant: 'destructive'
        })
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const columns: ColumnDef<EmployeePasswordsEntry>[] = [
    {
      accessorKey: 'Display Name',
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-3 flex gap-2 hover:text-primary  cursor-pointer"
          >
            {t.columns['display-name']}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => <div className="">{row.original.displayName}</div>
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
      accessorKey: 'password',
      header: ({ column }) => {
        return (
          <div className="pl-3 flex gap-2 hover:text-primary  cursor-pointer">
            {t.columns['password']}
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center justify-start">
          {row.getValue('password')}
        </div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-3">
          <InfoWrapper infoNode={<p>Copy to clipboard</p>}>
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(row?.original?.password)
              }}
              className="group py-1 px-3"
              variant={'ghost'}
            >
              <Icons.copyToClipboard className="text-muted-foreground group-hover:text-primary w-[1.15rem] h-auto " />
            </Button>
          </InfoWrapper>

          <InfoWrapper infoNode={<p>Send with email</p>}>
            <Button
              onClick={() => {
                setSendingId(row.original.id)
                sendCheckInEmail(row.original.email)
              }}
              className="group py-1 px-3"
              disabled={sendingId != row.original.id && isLoading}
              variant={'ghost'}
            >
              {sendingId == row.original.id && isLoading ? (
                <Icons.spinner className="w-4 h-auto animate-spin" />
              ) : (
                <Icons.send className="text-muted-foreground group-hover:text-primary w-[1.15rem] h-auto " />
              )}
            </Button>
          </InfoWrapper>
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
      <div className="flex items-center justify-between gap-4 py-4">
        <Input
          placeholder={t['search-placeholder'] + '...'}
          value={searchText ?? ''} // Use table.state.globalFilter to access the global filter value
          onChange={(event) => setSearchText(event.target.value)} // Use table.setGlobalFilter to update the global filter value
          className="max-w-sm"
        />
        <div className="hidden md:flex gap-3">
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
