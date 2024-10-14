'use client'
import { Card, CardFooter, CardGrid, Overlay } from '@/components/card'
import { Icons } from '@/components/icons'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CreateQualificationSchema } from '@/lib/validations/globals'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useClientApi from '@/hooks/use-axios-auth'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { SearchComboBox } from '@/components/search-combo-box'
import { Input } from '@/components/ui/input'
import { DEGREE_TYPES } from '@/config/globals'
import { useSession } from 'next-auth/react'
import { Locale } from '@/i18n.config'
import { Dictionary } from '@/types'

type FormData = z.infer<typeof CreateQualificationSchema>

interface AddQualificationFormProps {
  params: { id: string; lang: Locale }
  t: Dictionary
}

export const AddQualificationForm: React.FC<AddQualificationFormProps> = ({
  params: { id, lang },
  t
}: AddQualificationFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(CreateQualificationSchema)
  })
  const type = form.watch('type')

  const { refresh } = useRouter()
  const api = useClientApi()

  async function onSubmit(formData: FormData) {
    try {
      setIsLoading(true)

      const { data } = await api.post('/qualification/', {
        ...formData,
        authId: id
      })

      toast({
        title: 'Success',
        description: 'Qualification Added successfully'
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
                <FormLabel>{t['title-of-qualification']}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t['title-placeholder'] + '...'}
                    className="w-full"
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
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['degree-type']}</FormLabel>
                <FormControl>
                  <SearchComboBox
                    items={DEGREE_TYPES}
                    {...field}
                    topic="Degree Type"
                    value={type || ''}
                    setValue={(value) => form.setValue('type', value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['field-of-study']}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t['field-placeholder'] + '...'}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['institution']}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t['institution-placeholder'] + '...'}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="obtainedAt"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{t['year']}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={new Date().getFullYear().toString()}
                    className="w-full"
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
