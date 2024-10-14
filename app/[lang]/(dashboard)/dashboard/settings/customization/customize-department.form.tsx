'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { delay, toCapitalize } from '@/lib/utils'
import { Dictionary } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UnitsTable } from './units.table'
import * as z from 'zod'
import { Selector } from '@/components/selector'
import { ScrollArea } from '@/components/ui/scroll-area'

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  divisionId: z.string()
})

type Division = {
  id: string
  name: string
  updatedAt?: string
}

type Department = {
  id: string
  name: string
  divisionId: string
  updatedAt?: string
}

interface CustomizeDepartmentFormProps {
  divisions: Division[]
  departments: Department[]
  params: { lang: Locale }
  t: Dictionary
  tt: Dictionary
  page: number
  per_page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function CustomizeDepartmentForm({
  divisions,
  departments: inputDepartments,
  t,
  tt,
  params,
  page,
  per_page,
  hasNextPage,
  hasPrevPage
}: CustomizeDepartmentFormProps) {
  console.log('departments :', inputDepartments)
  console.log('divisions :', divisions)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [departments, setDepartments] = React.useState(inputDepartments)

  // update when departments changes
  React.useEffect(() => {
    setDepartments(inputDepartments)
  }, [inputDepartments])

  const [data, setData] = React.useState(
    departments.filter(({ divisionId }) => divisionId == divisions[0]?.id)
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      divisionId: divisions[0].id
    },
    resolver: zodResolver(FormSchema)
  })

  const divisionId = form.watch('divisionId')

  // useEffect code
  React.useEffect(() => {
    setData(departments.filter((i) => i.divisionId == divisionId))
  }, [divisionId, departments])

  const { refresh } = useRouter()
  const api = useClientApi()
  async function onSubmit({
    id,
    name,
    divisionId
  }: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true)
      const { data: res } = await api.post('department', { name, divisionId })
      setDepartments([
        ...departments,
        { id: res.id, name: res.name, divisionId: res.divisionId }
      ])
      setData((prev) => [
        ...prev,
        {
          id: res.id,
          name: res.name,
          divisionId: res.divisionId,
          updatedAt: res.updatedAt
        }
      ])
      toast({
        title: 'Success',
        description: <p>You have successfully a new company division.</p>
      })
      refresh()
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
    <div className="h-full w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="flex items-end gap-3">
            <div className="flex flex-col ">
              <FormField
                control={form.control}
                name="divisionId"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel>{t['division']}</FormLabel>
                    <FormControl>
                      <Selector
                        topic="Division"
                        setValue={(v) =>
                          form.setValue(
                            'divisionId',
                            divisions.find(({ name }) => name == v)!?.id
                          )
                        }
                        value={
                          divisions.find(({ id }) => id == divisionId)!?.name
                        }
                        items={divisions.map(({ name }) => name)}
                        className="flex w-full  
          focus-visible:ring-0  focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>{t['department']}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="flex w-full min-w-48 capitalize"
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
                t?.submit ?? 'Add'
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="px-1">
        <UnitsTable
          t={tt}
          apiEndpointUrl="department/"
          data={data}
          params={params}
          page={page}
          per_page={per_page}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>
    </div>
  )
}
