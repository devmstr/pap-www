import Link from 'next/link'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../../../../components/ui/dialog'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Dictionary } from '@/types'
import React from 'react'
import { AddEmployeeForm } from './add-employee-form'
import { Locale } from '@/i18n.config'
import useServerApi from '@/hooks/use-server-side-axios-auth'

interface AddEmployeeDialogProps {
  t?: Dictionary
  params: { lang: Locale }
}

export const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = async ({
  t,
  params
}: AddEmployeeDialogProps) => {
  const api = await useServerApi()
  const { data } = await api.get<{ data: { id: string; name: string }[] }>(
    'department',
    {
      params: { per_page: '9999' }
    }
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="flex gap-3 w-fit items-center justify-center  text-primary hover:text-primary/80"
        >
          <span className="mt-1">{t['btn']}</span>
          <Icons.personAdd className="w-6 h-6 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80%] lg:h-fit container max-w-5xl">
        <ScrollArea className="h-full p-0">
          <DialogHeader>
            <DialogTitle className="flex">{t['title']}</DialogTitle>
            <DialogDescription className="flex text-left">
              {t['sub-title']}
            </DialogDescription>
          </DialogHeader>
          {/* start  content */}

          <AddEmployeeForm t={t.form} params={params} departments={data.data} />

          {/* end content */}
          <DialogFooter className="sm:justify-start mt-8">
            <DialogClose asChild>
              <p className="text-xs text-muted-foreground">
                {t['read-more-about']}{' '}
                <Link href={'#'} className="text-primary hover:underline">
                  {t['employees']}{' '}
                </Link>
                .{' '}
              </p>
            </DialogClose>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
