'use client'
import { CardFooter, CardGrid } from '@/components/card'
import { DatePicker } from '@/components/date-picker'
import { Icons } from '@/components/icons'
import { SearchComboBox } from '@/components/search-combo-box'
import { Selector } from '@/components/selector'
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import {
  OBJECTIVES_CATEGORIES,
  OBJECTIVES_STATUS,
  OBJECTIVE_TYPES,
  PRIORITIES
} from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { getLastAndNextFiveYears } from '@/lib/utils'
import { PerformanceSchema } from '@/lib/validations/globals'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormData = z.infer<typeof PerformanceSchema>

interface AddGoalFormProps {
  t: Dictionary
  params: { lang: Locale; id: string }
}

export const AddGoalForm: React.FC<AddGoalFormProps> = ({
  params: { lang, id: authId },
  t
}: AddGoalFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const LAST_AND_NEXT_FIVE_YEARS = useMemo(getLastAndNextFiveYears, [])

  const form = useForm<FormData>({
    resolver: zodResolver(PerformanceSchema),
    defaultValues: {
      actualEndDate: new Date().toISOString(),
      actualStartDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
      plan: new Date().getFullYear().toString(),
      priority: PRIORITIES[0],
      category: OBJECTIVES_CATEGORIES[0].value
    }
  })
  const startDate = form.watch('startDate')
  const endDate = form.watch('endDate')
  const actualStartDate = form.watch('actualStartDate')
  const actualEndDate = form.watch('actualEndDate')
  const progress = form.watch('progress')
  const priority = form.watch('priority')
  const status = form.watch('status')
  const category = form.watch('category')

  const { refresh } = useRouter()
  const api = useClientApi()

  async function onSubmit({ id, ...formData }: FormData) {
    try {
      setIsLoading(true)
      const { data } = await api.post('/performance/', {
        ...formData,
        authId
      })
      toast({
        title: 'Success',
        description: 'Performance Added successfully'
      })
      refresh()
      form.reset()
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
            name="title"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['title']}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title here..."
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['plan']}</FormLabel>
                <FormControl>
                  <Selector
                    items={LAST_AND_NEXT_FIVE_YEARS}
                    {...field}
                    value={field.value || new Date().getFullYear().toString()}
                    setValue={(value) => form.setValue('plan', value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2 xl:col-span-3">
                <FormLabel>{t['description']}</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    className="h-36 xl:h-24"
                    placeholder="Description here..."
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['priority']}</FormLabel>
                <FormControl>
                  <Selector
                    items={PRIORITIES}
                    {...field}
                    setValue={(value) => form.setValue('priority', value)}
                    value={field.value || priority}
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
                    items={OBJECTIVES_STATUS}
                    {...field}
                    setValue={(value) => form.setValue('status', value)}
                    value={field.value || status}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['category']}</FormLabel>
                <FormControl>
                  <SearchComboBox
                    items={OBJECTIVES_CATEGORIES}
                    {...field}
                    topic="Categories"
                    value={field.value || category}
                    setValue={(value) => form.setValue('category', value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="progress"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['completion-level']}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0%"
                    className="w-full"
                    type="number"
                    {...field}
                    value={field.value || progress}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      form.setValue('progress', value)
                      // if (value >= 0) {
                      //   form.setValue('progress', value)
                      // }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="start-date-picker">{t['start-date']}</FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="start-date-picker"
                    locale={lang}
                    date={startDate ? new Date(startDate) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('startDate', value.toISOString())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="end-date-picker">{t['end-date']}</FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="end-date-picker"
                    locale={lang}
                    date={endDate ? new Date(endDate) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('endDate', value.toISOString())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actualStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="actual-start-date-picker">
                  {t['actual-start-date']}
                </FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="actual-start-date-picker"
                    locale={lang}
                    date={
                      actualStartDate ? new Date(actualStartDate) : new Date()
                    }
                    onDateChange={(value) =>
                      form.setValue('actualStartDate', value.toISOString())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actualEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="actual-end-date-picker">
                  {t['actual-end-date']}
                </FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="actual-end-date-picker"
                    locale={lang}
                    date={actualEndDate ? new Date(actualEndDate) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('actualEndDate', value.toISOString())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="success"
            render={({ field }) => (
              <FormItem className="col-span-2 xl:col-span-3">
                <FormLabel> {t['success-criteria']}</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-36 xl:h-24"
                    placeholder="Success criteria here..."
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="col-span-2 xl:col-span-3">
                <FormLabel> {t['comment']}</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-36 xl:h-24"
                    placeholder="Comment here..."
                    {...field}
                    value={field.value || ''}
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
