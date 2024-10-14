'use client'
import { AutoComplete } from '@/components/auto-complete-input'
import { Card, CardFooter, CardGrid, Overlay } from '@/components/card'
import { DatePicker } from '@/components/date-picker'
import { Icons } from '@/components/icons'
import { SearchComboBox } from '@/components/search-combo-box'
import { Selector } from '@/components/selector'
import { Switcher } from '@/components/switcher'
import { InfoWrapper } from '@/components/troplit'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/components/ui/use-toast'
import { READINESS_TYPES, SUCCESSION_PLAN_STATUS } from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import {
  SuccessionSchema,
  SuccessionSchemaType
} from '@/lib/validations/globals'
import { AutoCompleteItem } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete } from '@nextui-org/autocomplete'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EditSuccessionFormProps {
  data: SuccessionSchemaType
  params: { lang: Locale; id?: string }
}

export const EditSuccessionForm: React.FC<EditSuccessionFormProps> = ({
  data,
  params: { lang, id }
}: EditSuccessionFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<SuccessionSchemaType>({
    defaultValues: data,
    resolver: zodResolver(SuccessionSchema)
  })

  const date = form.watch('date')
  const readiness = form.watch('readiness')
  const isInterimSuccessor = form.watch('isInterimSuccessor')
  const status = form.watch('status')

  const { refresh, back } = useRouter()
  const api = useClientApi()

  async function onSubmit(formData: SuccessionSchemaType) {
    try {
      setIsLoading(true)
      const res = await api.patch('/succession/' + id, {
        ...formData,
        positionId: data.positionId,
        candidateId: data.candidateId
      })
      refresh()
      back()

      toast({
        title: 'Success',
        description: 'Qualification Added successfully'
      })
    } catch (error: any) {
      toast({
        title: 'Error Occurred',
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1">
        <CardGrid>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="sins-date-picker">{'Since (date)'}</FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="sins-date-picker"
                    locale={lang}
                    date={date ? new Date(date) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('date', value.toISOString())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="readiness"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>Readiness</FormLabel>
                <FormControl>
                  <Selector
                    items={READINESS_TYPES}
                    {...field}
                    setValue={(value) => form.setValue('readiness', value)}
                    value={readiness ? readiness : READINESS_TYPES[1]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-3">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="grid w-36 items-center gap-1.5">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Selector
                      items={SUCCESSION_PLAN_STATUS}
                      {...field}
                      setValue={(value) => form.setValue('status', value)}
                      value={status}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="isInterimSuccessor"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <InfoWrapper
                  infoNode={
                    <p className="max-w-sm px-3 py-4">
                      An{' '}
                      <span className="text-primary font-bold">
                        Interim Successor
                      </span>{' '}
                      is an individual appointed to temporarily fulfill the
                      duties and responsibilities of a key role within an
                      organization during a transitional period. They serve as a
                      temporary replacement for the incumbent leader, ensuring
                      continuity of operations and strategic direction until a
                      permanent successor is identified and appointed. Interim
                      successors often possess specialized skills and experience
                      relevant to the position they are temporarily filling,
                      enabling them to effectively manage the responsibilities
                      and challenges associated with the role.
                    </p>
                  }
                >
                  <FormLabel>
                    Interim Successor <span className="text-primary">?</span>
                  </FormLabel>
                </InfoWrapper>
                <FormControl>
                  <Switcher
                    checked={isInterimSuccessor}
                    onCheckedChange={(checked) => {
                      form.setValue('isInterimSuccessor', checked)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ranking"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>Ranking</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ranking..."
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (value >= 0) {
                        form.setValue('ranking', value)
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardGrid>
        <CardFooter>
          <Link
            href="/dashboard/succession"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full md:w-[8rem]'
            )}
          >
            Cancel
          </Link>
          <Button className={'w-full md:w-[8rem]'} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Update
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
