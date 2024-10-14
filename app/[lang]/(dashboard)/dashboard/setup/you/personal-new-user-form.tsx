'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { PersonalSchema } from '@/lib/validations/profile'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DatePicker } from '@/components/date-picker'
import { Icons } from '@/components/icons'
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CardFooter, CardGrid } from '@/components/card'
import { GENDERS, MARITAL_TYPES } from '@/config/globals'

interface PersonalHrFormProps {
  t: Dictionary
  params: { lang: Locale }
}

type FormData = z.infer<typeof PersonalSchema> & {
  dob: string | null
}

export const PersonalHrForm: React.FC<PersonalHrFormProps> = ({
  t,
  params: { lang }
}: PersonalHrFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<FormData>({
    defaultValues: {
      gender: GENDERS[0],
      marital: MARITAL_TYPES[0],
      sons: 0
    },
    resolver: zodResolver(PersonalSchema)
  })

  const marital = form.watch('marital')
  const dob = form.watch('dob')
  const gender = form.watch('gender')
  const sons = form.watch('sons')
  const { data: session, update } = useSession()

  const api = useClientApi()
  async function onSubmit(formData: FormData) {
    try {
      setIsLoading(true)

      if (!session) throw new Error('Session is not defined')

      await api.post('/profile/', formData)

      await api.post('/auth/on-boarded')

      // update On boarded on client
      await update({
        user: {
          ...session.user,
          onBoarded: true
        }
      })

      toast({
        title: 'Done !',
        description: (
          <p>
            Everything is set up .
            <br />
            Please wait while we redirect you to your dashboard.
          </p>
        )
      })
      window.location.href = '/dashboard'
    } catch (error) {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
      // redirect to dashboard
    }
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
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Middle Name..."
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
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Selector
                    items={GENDERS}
                    {...field}
                    className="peer text-foreground"
                    setValue={(value) => form.setValue('gender', value)}
                    value={gender || GENDERS[0]}
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
                <FormLabel>Marital Status</FormLabel>
                <FormControl>
                  <Selector
                    items={MARITAL_TYPES}
                    {...field}
                    setValue={(value) => form.setValue('marital', value)}
                    value={marital || MARITAL_TYPES[0]}
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
                <FormLabel id="dob-date-picker">Date of birth</FormLabel>
                <FormControl>
                  <DatePicker
                    aria-labelledby="dob-date-picker"
                    locale={lang}
                    date={dob ? new Date(dob) : new Date()}
                    onDateChange={(value) =>
                      form.setValue('dob', value.toISOString())
                    }
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
                <FormLabel>Sons</FormLabel>
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
                <FormLabel>SSN</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="SSN..."
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
            Done
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
