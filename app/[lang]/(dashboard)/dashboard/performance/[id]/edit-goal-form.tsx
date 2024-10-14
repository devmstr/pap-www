'use client'

import { CardGrid, CardFooter } from '@/components/card'
import { Icons } from '@/components/icons'
import { SearchComboBox } from '@/components/search-combo-box'
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PerformanceSchema } from '@/lib/validations/globals'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/date-picker'
import { Locale } from '@/i18n.config'
import { Selector } from '@/components/selector'
import { cn, getLastAndNextFiveYears } from '@/lib/utils'
import Link from 'next/link'
import {
  AUTH_ROLES,
  OBJECTIVES_CATEGORIES,
  OBJECTIVES_STATUS,
  PRIORITIES
} from '@/config/globals'
import { useSession } from 'next-auth/react'

type FormData = z.infer<typeof PerformanceSchema>

interface EditGoalFormProps {
  data: FormData
  params: { lang: Locale; id: string }
}

export const EditGoalForm: React.FC<EditGoalFormProps> = ({
  data,
  params: { lang, id }
}: EditGoalFormProps) => {
  const lastThreeYears = useMemo(getLastAndNextFiveYears, [])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<FormData>({
    defaultValues: {
      ...data,
      success: data.success || '',
      comment: data.comment || '',
      description: data.description || ''
    },
    resolver: zodResolver(PerformanceSchema)
  })
  const startDate = form.watch('startDate')
  const endDate = form.watch('endDate')
  const actualStartDate = form.watch('actualStartDate')
  const actualEndDate = form.watch('actualEndDate')
  const progress = form.watch('progress')
  const priority = form.watch('priority')
  const status = form.watch('status')
  const category = form.watch('category')

  const router = useRouter()

  const api = useClientApi()

  const { data: session } = useSession()

  async function onSubmit(formData: FormData) {
    try {
      setIsLoading(true)
      const { data } = await api.patch(`/performance/${id}`, formData)
      toast({
        title: 'Success',
        description: data.message
      })
      router.refresh()
      router.back()
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardGrid>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title here..."
                    className="w-full"
                    disabled={session?.user.role === AUTH_ROLES.EMPLOYEE}
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
                <FormLabel>Plan</FormLabel>
                <FormControl>
                  <Selector
                    {...field}
                    items={lastThreeYears}
                    value={field.value || new Date().getFullYear().toString()}
                    setValue={(value) => form.setValue('plan', value)}
                    disabled={session?.user.role === AUTH_ROLES.EMPLOYEE}
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    className="h-36 xl:h-24"
                    placeholder="Description here..."
                    {...field}
                    value={field.value || ''}
                    disabled={session?.user.role === AUTH_ROLES.EMPLOYEE}
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
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Selector
                    items={PRIORITIES}
                    {...field}
                    setValue={(value) => form.setValue('priority', value)}
                    value={priority || 'Optional'}
                    disabled={session?.user.role === AUTH_ROLES.EMPLOYEE}
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
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Selector
                    items={OBJECTIVES_STATUS}
                    {...field}
                    setValue={(value) => form.setValue('status', value)}
                    value={status || 'Planned'}
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
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <SearchComboBox
                    items={OBJECTIVES_CATEGORIES}
                    {...field}
                    topic="Categories"
                    value={category || 'Customer Satisfaction'}
                    setValue={(value) => form.setValue('category', value)}
                    disabled={session?.user.role === AUTH_ROLES.EMPLOYEE}
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
                <FormLabel>Completion Level</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0%"
                    className="w-full"
                    type="number"
                    {...field}
                    value={progress || 0}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (value >= 0) {
                        form.setValue('progress', value)
                      }
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
                <FormLabel id="start-date-picker">Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="start-date-picker"
                    locale={lang}
                    date={startDate ? new Date(startDate) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('startDate', value.toISOString())
                    }
                    isDisabled={session?.user.role === AUTH_ROLES.EMPLOYEE}
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
                <FormLabel id="end-date-picker">End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="end-date-picker"
                    locale={lang}
                    date={endDate ? new Date(endDate) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('endDate', value.toISOString())
                    }
                    isDisabled={session?.user.role === AUTH_ROLES.EMPLOYEE}
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
                  Actual End Date
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
            name="actualStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="actual-start-date-picker">
                  Actual Start Date
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
            name="success"
            render={({ field }) => (
              <FormItem className="col-span-2 xl:col-span-3">
                <FormLabel>Success Criteria</FormLabel>
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
                <FormLabel>Comment</FormLabel>
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
          <Link
            href={'/dashboard/performance'}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full md:w-[8rem]'
            )}
          >
            Back
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
