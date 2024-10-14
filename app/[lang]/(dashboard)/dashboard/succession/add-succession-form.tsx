'use client'
import { AutoComplete } from '@/components/auto-complete-input'
import { Card, CardFooter, CardGrid, Overlay } from '@/components/card'
import { DatePicker } from '@/components/date-picker'
import { Icons } from '@/components/icons'
import { SearchComboBox } from '@/components/search-combo-box'
import { Selector } from '@/components/selector'
import { Switcher } from '@/components/switcher'
import { InfoWrapper } from '@/components/troplit'
import { Button } from '@/components/ui/button'
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
import {
  SuccessionSchema,
  SuccessionSchemaType
} from '@/lib/validations/globals'
import { AutoCompleteItem, Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete } from '@nextui-org/autocomplete'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface AddSuccessionFormProps {
  t: Dictionary
  params: { lang: Locale; id?: string }
  keyPositions: AutoCompleteItem[]
  employees: AutoCompleteItem[]
}

export const AddSuccessionForm: React.FC<AddSuccessionFormProps> = ({
  t,
  params: { lang },
  keyPositions,
  employees
}: AddSuccessionFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<SuccessionSchemaType>({
    defaultValues: {
      id: undefined,
      candidateId: '',
      date: new Date().toISOString(),
      readiness: READINESS_TYPES[1],
      status: SUCCESSION_PLAN_STATUS[0],
      isInterimSuccessor: false,
      ranking: 1
    },
    resolver: zodResolver(SuccessionSchema)
  })

  const date = form.watch('date')
  const readiness = form.watch('readiness')
  const isInterimSuccessor = form.watch('isInterimSuccessor')
  const status = form.watch('status')
  const positionId = form.watch('positionId')
  const candidateId = form.watch('candidateId')

  const { refresh } = useRouter()
  const api = useClientApi()

  async function onSubmit(formData: SuccessionSchemaType) {
    try {
      setIsLoading(true)
      const res = await api.post('/succession', formData)

      refresh()
      form.reset()

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
            name="positionId"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>{t['position-title']}</FormLabel>
                <FormControl>
                  <SearchComboBox
                    items={keyPositions.map((d) => ({
                      ...d,
                      value: d.title
                    }))}
                    {...field}
                    topic="Key Position"
                    setValue={(value) =>
                      form.setValue(
                        'positionId',
                        keyPositions.find((d) => d.title === value)?.id || ''
                      )
                    }
                    value={keyPositions.find((d) => d.id === positionId)?.title}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="candidateId"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>{t['candidate-name']}</FormLabel>
                <FormControl>
                  <SearchComboBox
                    items={employees
                      .filter((e) => e.positionId != positionId)
                      .map((d) => ({
                        ...d,
                        value: d.displayName
                      }))}
                    {...field}
                    topic="Candidate"
                    setValue={(value) =>
                      form.setValue(
                        'candidateId',
                        employees.find((d) => d.displayName === value)?.id || ''
                      )
                    }
                    value={
                      employees.find((d) => d.id === candidateId)?.displayName
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="sins-date-picker">{t['since']}</FormLabel>
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
                <FormLabel>{t['readiness']}</FormLabel>
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
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['status']}</FormLabel>
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
                    {t['interim-successor']}{' '}
                    <span className="text-primary">?</span>
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
                <FormLabel>{t['ranking']}</FormLabel>
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
          <Button className={'w-full md:w-[8rem]'} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            {t['submit']}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
