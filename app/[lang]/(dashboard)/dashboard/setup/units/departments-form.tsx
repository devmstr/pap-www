'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import React from 'react'
import { Input } from '@/components/ui/input'
import { cn, toCapitalize, toKebabCase } from '@/lib/utils'
import { SetupCompanySchema } from '@/lib/validations/company-setup'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n.config'
import { Dictionary } from '@/types'
import useClientApi from '@/hooks/use-axios-auth'
import { error } from 'console'
import { CardFooter } from '@/components/card'
import { Icons } from '@/components/icons'

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one Department.'
  })
})

interface DepartmentsCheckboxListProps {
  params: { lang: Locale }
  items: { id: string; label: string }[]
  t: Dictionary
}

export function DepartmentsCheckboxList({
  items,
  t,
  params: { lang }
}: DepartmentsCheckboxListProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [divisionName, setDivisionName] = React.useState({ id: '', label: '' })
  const [itemsArray, setItemsArray] = React.useState(items)

  const handleAddDivision = () => {
    setItemsArray([...itemsArray, divisionName])
    setDivisionName({ id: '', label: '' })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['finance', 'sales', 'human-resources']
    }
  })
  const { push } = useRouter()

  const api = useClientApi()

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true)

      const selectedItems = items
        .filter((item) => formData.items.includes(item.id))
        .map((item) => ({
          name: item.label
        }))

      const res = await api.post('/department/all', selectedItems)

      toast({
        title: 'Thanks again !',
        description: (
          <p>
            You have successfully setup your company departments.
            <br />
            You can now setup your personal information .
          </p>
        )
      })
      setIsLoading(false)
      push('soft-skills')
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
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex gap-3 max-w-md mb-3">
          <Input
            value={divisionName.label}
            onChange={(e) =>
              setDivisionName({
                id: toKebabCase(e.target.value),
                label: toCapitalize(e.target.value)
              })
            }
            autoCapitalize="words"
            placeholder="Department name here ..."
          />
          <Button variant="default" onClick={handleAddDivision}>
            Add
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                {itemsArray.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="ml-1 flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) =>
                                          value !== item.id ||
                                          value == 'human-resources'
                                      )
                                    )
                              }}
                              className={cn(
                                item.id == 'human-resources' && 'opacity-40'
                              )}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <CardFooter>
            <Button className="w-fit px-4" variant={'default'}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                t?.submit ?? 'Update'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  )
}
