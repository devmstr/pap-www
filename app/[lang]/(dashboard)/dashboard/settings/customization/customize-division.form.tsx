'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { delay } from '@/lib/utils'
import { Dictionary } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UnitsTable } from './units.table'

const FormSchema = z.object({
  id: z.string().optional(),
  updateAt: z.string().optional(),
  name: z.string()
})

interface CustomizeDivisionFormProps {
  data: { id: string; name: string }[]
  params: { lang: Locale }
  t: Dictionary
  tt: Dictionary
  page: number
  per_page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function CustomizeDivisionForm({
  data,
  t,
  tt,
  params,
  page,
  per_page,
  hasNextPage,
  hasPrevPage
}: CustomizeDivisionFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [divisions, setDivisions] =
    React.useState<z.infer<typeof FormSchema>[]>(data)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  React.useEffect(() => {
    setDivisions(data)
  }, [data])

  const { refresh } = useRouter()

  const api = useClientApi()

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true)
      const res = await api.post('division', formData)
      refresh()
      setDivisions([...divisions, formData])
      toast({
        title: 'Success',
        description: <p>You have successfully add a new division.</p>
      })
    } catch (error: any) {
      toast({
        title: 'Error Occurred!',
        description: <p>{error.message}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormControl>
                    <Input
                      {...field}
                      className="flex w-full min-w-48"
                      autoCapitalize="words"
                      placeholder={t['search-placeholder']}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-fit" variant={'default'}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                t['submit'] ?? 'Add'
              )}
            </Button>
          </div>
        </form>
      </Form>
      <UnitsTable
        t={tt}
        apiEndpointUrl="division/"
        data={divisions}
        params={params}
        page={page}
        per_page={per_page}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  )
}
