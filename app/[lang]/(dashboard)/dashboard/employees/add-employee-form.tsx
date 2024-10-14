'use client'

import { CardFooter, CardGrid } from '@/components/card'
import { Input } from '@/components/ui/input'
import { NewEmployeeSchema } from '@/lib/validations/globals'
import { AutoCompleteItem, Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AutoComplete } from '@/components/auto-complete-input'
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
import { toast } from '@/components/ui/use-toast'
import { AUTH_ROLES, GENDERS, JOB_TYPES, ROLES } from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/date-picker'
import { Locale } from '@/i18n.config'

type FormData = z.infer<typeof NewEmployeeSchema>

interface AddEmployeeFormProps {
  params: { lang: Locale }
  t?: Dictionary
  departments: { id: string; name: string }[]
}

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  t,
  departments,
  params: { lang }
}: AddEmployeeFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [title, setTitle] = useState<string>('')
  const [autoCompleteItems, setAutoCompleteItems] = useState<
    AutoCompleteItem[]
  >([])

  const api = useClientApi()
  const form = useForm<FormData>({
    defaultValues: {
      role: AUTH_ROLES.EMPLOYEE,
      type: JOB_TYPES[0],
      gender: 'M',
      departmentId: departments[0]?.id
    },
    resolver: zodResolver(NewEmployeeSchema)
  })

  const isKeyPosition = form.watch('isKeyPosition')
  const departmentId = form.watch('departmentId')
  const title = form.watch('title')
  const employeeNumber = form.watch('employeeNumber')
  const employedAt = form.watch('employedAt')

  const { data: session } = useSession()
  const { refresh } = useRouter()

  async function onSubmit(formData: FormData) {
    try {
      setIsLoading(true)

      if (!session) throw new Error('Session is not defined')

      const { data } = await api.put('profile', formData)

      toast({
        title: 'Successfully Updated',
        description: (
          <p>You have successfully updated your personal information. </p>
        )
      })
      // refresh route
      refresh()
      // empty all fiels
      form.reset()
    } catch (error: any) {
      toast({
        title: 'Error Occurred!',
        description: <p>{error.response.data.error}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getSectorPositions = async (id: string) => {
    try {
      const { data } = await api.get<{ id: string; title: string }[]>(
        `/position`
      )
      setAutoCompleteItems(data.map((d) => ({ ...d, value: d.title })))
    } catch (error: any) {
      toast({
        title: 'Error Occurred!',
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    if (departmentId) {
      getSectorPositions(departmentId)
    }
  }, [departmentId])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
        <div className="my-6 ">
          <span className="text-2xl sm:text-3xl text-muted-foreground/10 font-inter">
            {t['account']}
          </span>
        </div>
        <CardGrid>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t['email']}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email Name..."
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
            name="role"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel> {t['role']}</FormLabel>
                <FormControl>
                  <Selector
                    items={ROLES}
                    {...field}
                    className="peer text-foreground"
                    setValue={(value) => form.setValue('role', value)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel> {t['department']}</FormLabel>
                <FormControl>
                  <SearchComboBox
                    {...field}
                    items={departments.map(({ name: value }) => ({ value }))}
                    topic="Departments"
                    value={
                      departments.find(({ id }) => id == departmentId)?.name
                    }
                    setValue={(value) => {
                      const id = departments.find(
                        ({ name }) => name === value
                      )?.id
                      if (!id) return
                      form.setValue('departmentId', id)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardGrid>
        <div className="my-6 ">
          <span className="text-2xl sm:text-3xl text-muted-foreground/10 font-inter">
            {t['personal']}
          </span>
        </div>
        <CardGrid>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t['first-name']}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="capitalize"
                    placeholder="First Name..."
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t['last-name']}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="capitalize"
                    placeholder="Last Name..."
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t['gender']}</FormLabel>
                <FormControl>
                  <Selector
                    items={GENDERS}
                    {...field}
                    className="peer text-foreground"
                    setValue={(value) => form.setValue('gender', value)}
                    value={field.value || GENDERS[0]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardGrid>
        <div className="my-6 ">
          <span className="text-2xl sm:text-3xl text-muted-foreground/10 font-inter">
            {t['position']}
          </span>
        </div>
        <CardGrid>
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
                      specifically refers to an individual employee who occupies
                      such a critical role within the company. This employee is
                      often pivotal in driving the company's performance,
                      achieving its goals, and contributing to its overall
                      success.
                    </p>
                  }
                >
                  <FormLabel>
                    {t['key-position']} <span className="text-primary">?</span>
                  </FormLabel>
                </InfoWrapper>
                <FormControl>
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
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t['position']}</FormLabel>
                <FormControl>
                  <AutoComplete
                    items={autoCompleteItems}
                    setValue={(v) => {
                      form.setValue('title', v)
                    }}
                    value={title}
                    placeholder="Job Position..."
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
                  <FormLabel>
                    {t['employee-number']}{' '}
                    <span className="text-primary">?</span>
                  </FormLabel>
                </InfoWrapper>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Employee Number #..."
                    {...field}
                    value={employeeNumber || 0}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (value >= 1) {
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t['position-type']}</FormLabel>
                <FormControl>
                  <Selector
                    items={JOB_TYPES}
                    {...field}
                    setValue={(value) => form.setValue('type', value)}
                    value={field.value || JOB_TYPES[0]}
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
                  {' '}
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
        </CardGrid>
        <CardFooter>
          <Button className={'w-full md:w-[8rem]'} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            {t['submit'] ?? 'Add'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
