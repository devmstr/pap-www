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
} from '@/components/ui/dialog'

import { Dictionary } from '@/types'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AddQualificationForm } from './add-qualification-form'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'

interface AddQualificationDialogProps {
  params: { id: string; lang: Locale }
}

export const AddQualificationDialog: React.FC<
  AddQualificationDialogProps
> = async ({ params }: AddQualificationDialogProps) => {
  const {
    dialogs: { qualifications: t }
  } = await getDictionary(params.lang)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="flex gap-3 w-fit  text-primary hover:text-primary/80"
        >
          {t['trigger-title']}
          <Icons.addCircle className="w-6 h-6 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit container max-w-5xl">
        <ScrollArea className="h-full p-0">
          <DialogHeader>
            <DialogTitle className="flex"> {t['title']}</DialogTitle>
            <DialogDescription className="flex text-left max-w-4xl">
              {t['sub-title']}
            </DialogDescription>
          </DialogHeader>
          {/* start  content */}
          <div className="pt-8 pb-4">
            <AddQualificationForm t={t.form} params={params} />
          </div>
          {/* end content */}
          <DialogFooter className="sm:justify-start mt-8">
            <DialogClose asChild>
              <p className="text-xs text-muted-foreground">
                {t['read-more-about']}{' '}
                <Link href={'#'} className="text-primary hover:underline">
                  {t['qualifications']}{' '}
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
