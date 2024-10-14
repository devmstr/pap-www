'use client'

import { CardFooter, CardGrid } from '@/components/card'
import { DatePicker } from '@/components/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Icons } from '@/components/icons'
import { Selector } from '@/components/selector'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { JobSchema, JobSchemaType } from '@/lib/validations/profile'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ONBOARDING_DEPARTMENTS } from '@/config/on-boarding'
import router from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AUTH_ROLES, JOB_TYPES, ROLES } from '@/config/globals'
import { SearchComboBox } from '@/components/search-combo-box'
import { InfoWrapper } from '@/components/troplit'
import { Switcher } from '@/components/switcher'

export const dynamic = 'force-dynamic'

interface JobFormRestrictedProps {
  t: Dictionary
  data: JobSchemaType
  params: { lang: Locale; id: string }
  departments: { id: string; name: string }[]
}

export const JobFormRestricted: React.FC<JobFormRestrictedProps> = ({
  data,
  t,
  departments,
  params: { lang, id }
}: JobFormRestrictedProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<JobSchemaType>({
    defaultValues: {
      title: data.title,
      employedAt: data.employedAt || new Date().toISOString(),
      type: data.type || JOB_TYPES[0],
      isKeyPosition: data.isKeyPosition || false,
      employeeNumber: data.employeeNumber || 1,
      description: data.description || ''
    },
    resolver: zodResolver(JobSchema)
  })
  const employedAt = form.watch('employedAt')
  const type = form.watch('type')

  const router = useRouter()
  const { data: session } = useSession()
  const api = useClientApi()

  async function onSubmit(formData: JobSchemaType) {
    try {
      setIsLoading(true)

      if (!session) throw new Error('Session is not defined')

      const { data } = await api.patch('/position/' + id, formData)
      toast({
        title: 'Successfully Updated',
        description: <p>You have successfully updated your job information. </p>
      })
      router.refresh()
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
              <FormItem>
                <FormLabel id="job-title">Job Title</FormLabel>
                <FormControl>
                  <Input
                    aria-labelledby="job-title"
                    placeholder="Job Title here..."
                    className="w-full"
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
            name="employedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="hiring-date-picker">Hiring Date</FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="hiring-date-picker"
                    locale={lang}
                    date={employedAt ? new Date(employedAt) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('employedAt', value.toISOString())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="job-type">Job Type</FormLabel>
                <FormControl>
                  <Selector
                    aria-labelledby="job-type"
                    items={JOB_TYPES}
                    {...field}
                    setValue={(value) => form.setValue('type', value)}
                    value={type ? type : JOB_TYPES[0]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <InfoWrapper
                  infoNode={
                    <p className="max-w-sm px-3 py-4">
                      An{' '}
                      <span className="text-primary font-bold">
                        Employee Number
                      </span>{' '}
                      often referred to as an employee ID or staff
                      identification number, It serves as a standardized
                      identifier for administrative and organizational purposes
                      This unique number helps streamline HR processes and
                      ensures accurate tracking of employee data throughout
                      their tenure with the company.
                    </p>
                  }
                >
                  <FormLabel id="employee-number">
                    Employee Number <span className="text-primary">?</span>
                  </FormLabel>
                </InfoWrapper>
                <FormControl>
                  <Input
                    className="appearance-none"
                    type="number"
                    placeholder="Employee Number #..."
                    aria-labelledby="employee-number"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (!isNaN(value) && value >= 1) {
                        form.setValue('employeeNumber', value)
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
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel id="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    className="h-36 xl:h-24"
                    placeholder="Description here..."
                    aria-labelledby="description"
                    {...field}
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
            Update
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
