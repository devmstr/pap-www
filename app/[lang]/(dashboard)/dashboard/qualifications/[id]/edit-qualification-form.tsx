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
import { UpdateQualificationSchema } from '@/lib/validations/globals'
import { QualificationEntry } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DEGREE_TYPES } from '@/config/globals'
import { Locale } from '@/i18n.config'

type FormData = z.infer<typeof UpdateQualificationSchema>

interface EditQualificationFormProps {
  params: { lang: Locale; id: string }
  data: FormData
}

export const EditQualificationForm: React.FC<EditQualificationFormProps> = ({
  data,
  params: { lang, id }
}: EditQualificationFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<FormData>({
    defaultValues: data,
    resolver: zodResolver(UpdateQualificationSchema)
  })

  const type = form.watch('type')
  const { refresh } = useRouter()
  const api = useClientApi()

  async function onSubmit(formData: FormData) {
    try {
      setIsLoading(true)
      const { data } = await api.patch('/qualification/' + id, {
        ...formData
      })
      toast({
        title: 'Success',
        description: data.message
      })
      refresh()
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
    if (!data.snapshot || fieldName == 'snapshot') return undefined
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
            name="title"
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel confirmed={confirme(field.name)}>
                  Title of Qualification
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title here..."
                    className="w-full"
                    confirmed={confirme(field.name)}
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
                <FormLabel confirmed={confirme(field.name)}>
                  Degree Type
                </FormLabel>
                <FormControl>
                  <SearchComboBox
                    items={DEGREE_TYPES}
                    {...field}
                    topic="Degree Type"
                    value={type || ''}
                    setValue={(value) => form.setValue('type', value)}
                    confirmed={confirme(field.name)}
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
                <FormLabel confirmed={confirme(field.name)}>
                  Field of Study
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Field here..."
                    className="w-full"
                    confirmed={confirme(field.name)}
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
                <FormLabel confirmed={confirme(field.name)}>
                  Institution
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Institution here..."
                    className="w-full"
                    confirmed={confirme(field.name)}
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
                <FormLabel confirmed={confirme(field.name)}>Year</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={new Date().getFullYear().toString()}
                    className="w-full"
                    confirmed={confirme(field.name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardGrid>
        <CardFooter>
          <Link
            href="/dashboard/qualifications"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full md:w-[8rem]'
            )}
          >
            Cancel
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
