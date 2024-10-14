'use client'

import { AutoComplete } from '@/components/auto-complete-input'
import { CardFooter, CardGrid } from '@/components/card'
import { DatePicker } from '@/components/date-picker'
import { Icons } from '@/components/icons'
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
import { INDUSTRIES } from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { SetupCompanySchema } from '@/lib/validations/company-setup'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface SetupCompanyFormProps {
  t: Dictionary
  params: { lang: Locale }
  data:
    | {
        name: string
        founded?: string | undefined
        website?: string | undefined
        founders?: string | undefined
        employeeCount?: number | undefined
      }
    | undefined
}

type FormData = Zod.infer<typeof SetupCompanySchema> & {
  founded: string
  employeeCount: number
}

export const SetupCompanyForm: React.FC<SetupCompanyFormProps> = ({
  t,
  params: { lang },
  data
}: SetupCompanyFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(SetupCompanySchema),
    defaultValues: data
      ? {
          name: data.name || '',
          website: data.website || '',
          founders: data.founders || '',
          employeeCount: data.employeeCount || 1,
          founded: data.founded
            ? new Date(data.founded).toISOString()
            : new Date().toISOString()
        }
      : {
          founded: new Date().toISOString(),
          employeeCount: 1
        }
  })

  const founded = form.watch('founded')
  const employeeCount = form.watch('employeeCount')
  const industry = form.watch('industry')

  const { push, refresh } = useRouter()

  const api = useClientApi()

  async function onSubmit(formData: FormData) {
    try {
      setIsLoading(true)

      const {
        data: { Divisions: divisions }
      } = await api.post<{
        Divisions: { id: string }[]
      }>('/company/setup', formData)

      toast({
        title: 'Thanks !',
        description: (
          <p>
            Your company has been setup successfully.
            <br />
            You can now setup your CEO account information.
          </p>
        )
      })
      refresh()
      setIsLoading(false)
      push('setup/ceo-info')
    } catch (error: any) {
      setIsLoading(false)
      toast({
        title: error.response.data.error,
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardGrid>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company name here..."
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
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Industry</FormLabel>
                <FormControl>
                  <AutoComplete
                    items={INDUSTRIES.map((i) => ({ id: i, value: i }))}
                    setValue={(v) => form.setValue('industry', v)}
                    value={industry || ''}
                    className="sm:col-span-2"
                    placeholder="Search for Industry..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="founded"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="founded-date-picker">Foundation Date</FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby='founded-date-picker'
                    onDateChange={(date) => {
                      form.setValue('founded', date.toISOString())
                    }}
                    date={founded ? new Date(founded) : new Date()}
                    locale={lang || 'en'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Website url here..."
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
            name="employeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employees Count</FormLabel>
                <FormControl>
                  <Input
                    id="employee-count"
                    type="number"
                    {...field}
                    value={employeeCount || 1}
                    onChange={(e) =>
                      form.setValue('employeeCount', parseInt(e.target.value))
                    }
                    placeholder="Employee number here ..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="founders"
            render={({ field }) => (
              <FormItem className="col-span-2 xl:col-span-3">
                <FormLabel>Founders Names</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="founders here..."
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
            Next
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
