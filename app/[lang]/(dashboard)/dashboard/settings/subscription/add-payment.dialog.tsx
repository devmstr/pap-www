import Link from 'next/link'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Dictionary, SkillRating, Skill } from '@/types'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Locale } from '@/i18n.config'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Loading } from '@/components/loading'
import { PaymentCardForm } from './payment-card-form'

interface AddPaymentDialogProps {
  t?: Dictionary
  params: { lang: Locale }
}

export const AddPaymentDialog: React.FC<AddPaymentDialogProps> = async ({
  t,
  params
}: AddPaymentDialogProps) => {
  const api = await useServerApi()
  const session = await getServerSession(authOptions)
  const fetchData = async () => {
    try {
      return {}
    } catch (error) {
      console.error(error)
    }
  }
  const data = await fetchData()
  if (!data) return <Loading />

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="flex gap-3 w-fit text-sm  text-primary hover:text-primary/80"
        >
          {'Add'}
          <Icons.addCircle className="w-[1.2rem] h-[1.2rem] " />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit h-fit ">
        <DialogHeader>
          <DialogTitle className="flex">Payment method</DialogTitle>
          <DialogDescription className="flex text-md text-left max-w-4xl">
            Select a payment method.
          </DialogDescription>
        </DialogHeader>
        {/* start  content */}
        <PaymentCardForm t={{}} params={params} />
      </DialogContent>
    </Dialog>
  )
}
