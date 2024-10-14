import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from './ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from './ui/dropdown-menu'
import Link from 'next/link'
import { Button } from './ui/button'
import { Icons } from './icons'
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog'
import { buttonVariants } from './ui/button'
import useClientApi from '@/hooks/use-axios-auth'
import { useRouter } from 'next/navigation'
import React from 'react'

interface TeamTableActionsProps {
  id: string
  control?: boolean
}

export const TeamTableActions: React.FC<TeamTableActionsProps> = ({
  id,
  control = false
}: TeamTableActionsProps) => {
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const api = useClientApi()
  const { refresh } = useRouter()

  const handleDelete = async (employeeId: string) => {
    if (!control) return
    try {
      setIsDeleting(true)
      const { data } = await api.delete('team/' + employeeId)
      refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex gap-3  items-center justify-center w-12 cursor-pointer hover:text-primary text-muted-foreground ring-0 '
              )}
              href={'/dashboard/profile/' + id}
            >
              <Icons.expend className="w-4 h-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex gap-3 items-center justify-center w-12 cursor-pointer group  ring-0 hover:text-primary text-muted-foreground'
              )}
              href={'/dashboard/profile/' + id + '/performance'}
            >
              <Icons.goal className="w-[1.15rem] h-[1.15rem]   " />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex gap-3 items-center justify-center w-12 cursor-pointer group  ring-0 hover:text-primary text-muted-foreground'
              )}
              href={'/dashboard/profile/' + id + '/idps'}
            >
              <Icons.idp className="w-4 h-4 fill-current" />
            </Link>
          </DropdownMenuItem>
          {control && (
            <div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button
                  variant={'ghost'}
                  className="flex group gap-3 items-center justify-center w-12 cursor-pointer focus:text-destructive text-muted-foreground "
                  onClick={() => setShowDeleteAlert(true)}
                >
                  <Icons.trash className="w-4 h-4 group-hover:text-destructive " />
                </Button>
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Employee from team?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Don't worry this actions will not delete the employee account , it
              only remove the employee from this team.
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
