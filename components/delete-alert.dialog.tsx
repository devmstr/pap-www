import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger
} from '@radix-ui/react-alert-dialog'
import { useState } from 'react'
import { Icons } from './icons'
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog'
import { Button } from './ui/button'

interface DeleteAlertProps {
  onDelete: () => void
  isDeleteLoading: boolean
  message?: string
}

export const DeleteAlert: React.FC<DeleteAlertProps> = ({
  onDelete,
  isDeleteLoading,
  message
}: DeleteAlertProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  return (
    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogTrigger asChild>
        <Button className="group relative" variant={'ghost'}>
          <Icons.trash className="w-[1.15rem] h-[1.15rem] group-hover:text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {message || 'Are you sure you want to delete this?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Be careful this action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="flex gap-2 items-center bg-red-500 focus:ring-red-500"
            disabled={isDeleteLoading}
          >
            {isDeleteLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
