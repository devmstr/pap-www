'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icons'
import useClientApi from '@/hooks/use-axios-auth'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from './ui/button'
import { CompanyUnitEntity } from '@/types'

interface CompanyUnitsTableProps {
  id: string
  data: CompanyUnitEntity[]
  setData: React.Dispatch<React.SetStateAction<CompanyUnitEntity[]>>
  handleDelete: (id: string) => Promise<void>
  isDeleting: boolean
}

export function CompanyUnitsTable({
  id,
  data,
  setData,
  handleDelete,
  isDeleting
}: CompanyUnitsTableProps) {
  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Button
              variant={'ghost'}
              className="flex group gap-3 items-center justify-center w-12 cursor-pointer ring-0 "
              onClick={() => setShowDeleteAlert(true)}
            >
              <Icons.trash className="w-4 h-4 group-hover:text-destructive" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Be careful that all data attached to this company unit will be
              permanently deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  ' text-red-500 focus:ring-red-500 hover:bg-red-500 hover:text-white border-red-500'
                )}
                onClick={() => {
                  setDeletingId(id)
                  handleDelete(id)
                }}
              >
                {isDeleting && deletingId == id ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.trash className="mr-2 h-4 w-4" />
                )}
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
