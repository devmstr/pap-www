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

interface JobFormProps {
  t: Dictionary
  data: JobSchemaType
  isRestricted: boolean
  params: { lang: Locale; id: string }
  departments: { id: string; name: string }[]
}

export const JobForm: React.FC<JobFormProps> = ({
  data,
  t,
  isRestricted = true,
  departments,
  params: { lang, id }
}: JobFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<JobSchemaType>({
    defaultValues: {
      title: data.title,
      employedAt: data.employedAt || new Date().toISOString(),
      type: data.type || JOB_TYPES[0],
      isKeyPosition: data.isKeyPosition || false,
      employeeNumber: data.employeeNumber || undefined,
      description: data.description || '',
      role: data.role || undefined,
      Department: data.Department
    },
    resolver: zodResolver(JobSchema)
  })
  const isKeyPosition = form.watch('isKeyPosition')
  const departmentId = form.watch('Department.id')
  const employedAt = form.watch('employedAt')
  const type = form.watch('type')

  const router = useRouter()
  const { data: session } = useSession()
  const api = useClientApi()

  async function onSubmit(formData: JobSchemaType) {
    try {
      console.log(formData)
      setIsLoading(true)
      if (!session) throw new Error('Session is not defined')
      console.log('formData:', formData)
      const { data } = await api.patch(`/position/${id}`, formData)
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
          {!isRestricted && (
            <>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>{t['role']}</FormLabel>
                    <FormControl>
                      <Selector
                        items={ROLES}
                        {...field}
                        className="peer text-foreground"
                        setValue={(value) => form.setValue('role', value)}
                        value={field.value ? field.value : data.role}
                        disabled={data.role == 'CEO'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Department.id"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>{t['department']}</FormLabel>
                    <FormControl>
                      <SearchComboBox
                        items={departments?.map(({ name: value }) => ({
                          value
                        }))}
                        {...field}
                        topic="Department"
                        setValue={(value) =>
                          form.setValue(
                            'Department.id',
                            departments.find(({ name }) => name === value)?.id
                          )
                        }
                        value={
                          departments.find(({ id }) => id === departmentId)
                            ?.name
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isKeyPosition"
                render={({ field }) => (
                  <FormItem className="md:col-span-3">
                    <InfoWrapper
                      infoNode={
                        <p className="max-w-sm px-3 py-4">
                          An{' '}
                          <span className="text-primary font-bold">
                            Employee key position
                          </span>{' '}
                          specifically refers to an individual employee who
                          occupies such a critical role within the company. This
                          employee is often pivotal in driving the company's
                          performance, achieving its goals, and contributing to
                          its overall success.
                        </p>
                      }
                    >
                      <FormLabel id="is-key-position">
                        {t['key-position']}{' '}
                        <span className="text-primary">{' ?'}</span>
                      </FormLabel>
                    </InfoWrapper>
                    <FormControl aria-labelledby="is-key-position">
                      <Switcher
                        checked={isKeyPosition}
                        onCheckedChange={(checked) => {
                          form.setValue('isKeyPosition', checked)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="job-title">{t['job-title']}</FormLabel>
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
                <FormLabel id="hiring-date-picker">
                  {t['hiring-date']}
                </FormLabel>
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
                <FormLabel id="job-type">{t['job-type']}</FormLabel>
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
                    {t['employee-number']}{' '}
                    <span className="text-primary">?</span>
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
                <FormLabel id="description">{t['description']}</FormLabel>
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
            {t['submit']}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
