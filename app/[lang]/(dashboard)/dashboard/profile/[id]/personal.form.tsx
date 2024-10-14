'use client'

import { Card, CardFooter, CardGrid } from '@/components/card'
import { Input } from '@/components/ui/input'
import { PersonalSchema } from '@/lib/validations/profile'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Selector } from '@/components/selector'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/date-picker'
import { Locale } from '@/i18n.config'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { GENDERS, MARITAL_TYPES } from '@/config/globals'

type FormData = z.infer<typeof PersonalSchema>

interface PersonalProfileFormProps {
  t?: Dictionary
  data?: FormData
  params: { lang: Locale; id: string }
}

export const PersonalProfileForm: React.FC<PersonalProfileFormProps> = ({
  t,
  data,
  params: { lang, id }
}: PersonalProfileFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<FormData>({
    defaultValues: {
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      middleName: data?.middleName || '',
      dob: data?.dob || new Date().toISOString(),
      marital: data?.marital || MARITAL_TYPES[0],
      sons: data?.sons || 0,
      gender: data?.gender || GENDERS[0],
      ssn: data?.ssn || ''
    },
    resolver: zodResolver(PersonalSchema)
  })

  const marital = form.watch('marital')
  const dob = form.watch('dob')
  const gender = form.watch('gender')
  const sons = form.watch('sons')
  const router = useRouter()
  const api = useClientApi()

  const { data: session } = useSession()

  async function onSubmit(formData: FormData) {
    try {
      setIsLoading(true)
      if (!session) throw new Error('Session is not defined')
      const { data } = await api.patch('profile/' + id, formData)
      toast({
        title: 'Successfully Updated',
        description: data.message
      })
      router.refresh()
    } catch (error: any) {
      toast({
        title: error.response.data.error,
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirme = (fieldName: keyof FormData) => {
    if (!data || !data.snapshot || fieldName == 'snapshot') return undefined
    if (
      data.snapshot[fieldName] != null &&
      data[fieldName] != data.snapshot[fieldName]
    )
      return false
    return true
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardGrid>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {t['first-name']}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First Name..."
                    {...field}
                    value={field.value || ''}
                    confirmed={confirme(field.name)}
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
                <FormLabel confirmed={confirme(field.name)}>
                  {t['last-name']}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last Name..."
                    {...field}
                    value={field.value || ''}
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {t['middle-name']}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Middle Name..."
                    {...field}
                    value={field.value || ''}
                    confirmed={confirme(field.name)}
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
                <FormLabel confirmed={confirme(field.name)}>
                  {t['gender']}
                </FormLabel>
                <FormControl>
                  <Selector
                    items={GENDERS}
                    {...field}
                    className="peer text-foreground"
                    setValue={(value) => form.setValue('gender', value)}
                    value={gender ? gender : 'M'}
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marital"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {t['marital-status']}
                </FormLabel>
                <FormControl>
                  <Selector
                    items={MARITAL_TYPES}
                    {...field}
                    setValue={(value) => form.setValue('marital', value)}
                    value={marital || MARITAL_TYPES[0]}
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  id="dob-date-picker"
                  confirmed={confirme(field.name)}
                >
                  {t['date-of-birth']}
                </FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="dob-date-picker" // Ensure this is set
                    locale={lang || 'en'}
                    date={dob ? new Date(dob) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('dob', value.toISOString())
                    }
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sons"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {t['sons']}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Sons..."
                    {...field}
                    value={sons || 0}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (value >= 0) {
                        form.setValue('sons', value)
                      }
                    }}
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ssn"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {t['ssn']}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="SSN..."
                    {...field}
                    value={field.value || ''}
                    confirmed={confirme(field.name)}
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
            {t['submit'] ?? 'Update'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
