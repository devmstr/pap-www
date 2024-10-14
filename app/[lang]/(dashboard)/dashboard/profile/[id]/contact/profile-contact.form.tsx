'use client'

import { CardFooter, CardGrid } from '@/components/card'
import { Icons } from '@/components/icons'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { ContactSchema } from '@/lib/validations/profile'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { SearchComboBox } from '@/components/search-combo-box'
import { COUNTRIES, PROVINCES } from '@/config/globals'
export const dynamic = 'force-dynamic'

type FormData = z.infer<typeof ContactSchema>

interface ContactFormProps {
  t: Dictionary
  data?: FormData
  params: { lang: string; id: string }
}

export const ContactForm: React.FC<ContactFormProps> = ({
  data,
  t,
  params: { lang, id }
}: ContactFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<FormData>({
    defaultValues: {
      mobile: data?.mobile || '',
      work: data?.work || '',
      email: data?.email || '',
      home: data?.home || '',
      country: data?.country || '',
      city: data?.city || '',
      street1: data?.street1 || '',
      street2: data?.street2 || '',
      zip: data?.zip || '',
      state:
        data?.country === 'Algeria' && !data.state ? 'Adrar' : data?.state || ''
    },
    resolver: zodResolver(ContactSchema)
  })
  const country = form.watch('country')
  const state = form.watch('state')

  const { refresh } = useRouter()
  const api = useClientApi()
  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true)
      await api.patch('/contact/' + id, data)
      refresh()
      toast({
        title: 'Success',
        description: 'Contact info updated successfully'
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardGrid>
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)} required>
                  {t['mobile']}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="01234 567890"
                    className="w-full"
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
            name="work"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {' '}
                  {t['work']}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="01234 567890"
                    className="w-full"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {' '}
                  {t['email']}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example@email.com..."
                    className="w-full"
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
            name="home"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {' '}
                  {t['home']}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="01234 567890"
                    className="w-full"
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
        <div className="my-6 ">
          <span className="text-2xl sm:text-3xl text-muted-foreground/15 font-inter select-none">
            {t['address']}
          </span>
        </div>
        <CardGrid>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel confirmed={confirme(field.name)}>
                  {' '}
                  {t['country']}
                </FormLabel>
                <FormControl>
                  <SearchComboBox
                    items={COUNTRIES}
                    {...field}
                    topic="Countries"
                    value={country}
                    setValue={(value) => form.setValue('country', value)}
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {country === 'Algeria' ? (
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5">
                  <FormLabel confirmed={confirme(field.name)}>
                    {t['province']}
                  </FormLabel>
                  <FormControl>
                    <SearchComboBox
                      items={PROVINCES}
                      {...field}
                      topic="Provinces"
                      value={state || ''}
                      setValue={(value) => form.setValue('state', value)}
                      confirmed={confirme(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel confirmed={confirme(field.name)}>
                    {t['province']}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="state"
                      placeholder={t.state}
                      {...field}
                      confirmed={confirme(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {' '}
                  {t['city']}
                </FormLabel>
                <FormControl>
                  <Input
                    id="city"
                    placeholder={t.state}
                    {...field}
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street1"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {' '}
                  {t['street1']}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.state}
                    {...field}
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street2"
            render={({ field }) => (
              <FormItem>
                <FormLabel confirmed={confirme(field.name)}>
                  {t['street2']}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.state}
                    {...field}
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="zip-code" confirmed={confirme(field.name)}>
                  {t['zip']}
                </FormLabel>
                <FormControl>
                  <Input
                    id="zip-code"
                    placeholder={t.zip}
                    {...field}
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
            {t['submit']}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
