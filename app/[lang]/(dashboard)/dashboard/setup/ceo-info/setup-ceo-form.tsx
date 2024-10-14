'use client'

import { CardFooter, CardGrid } from '@/components/card'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface SetupCeoFormProps {
  params: { lang: Locale }
}

const SetupCeoSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter'
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter'
    })
    .refine((password) => /\d/.test(password), {
      message: 'Password must contain at least one digit'
    })
    .refine((password) => /[!@#$%^&*(),.?:{}|<>]/.test(password), {
      message: 'Password must contain at least one special character'
    })
})

type FormData = Zod.infer<typeof SetupCeoSchema> & {
  founded: string
  employeeCount: number
}

export const SetupCeoForm: React.FC<
  SetupCeoFormProps
> = ({}: SetupCeoFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<FormData>({
    resolver: zodResolver(SetupCeoSchema)
  })
  const api = useClientApi()
  const { refresh, push } = useRouter()
  const onSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true)
      const { data } = await api.post('company/setup/ceo', formData)
      await fetch(`/api/email/confirm`, {
        // Add the API URL here
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          displayName: `${formData.firstName} ${formData.lastName}`
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      refresh()
      setIsLoading(false)
      toast({
        title: 'Thanks again !',
        description: (
          <p>
            You have successfully setup your CEO Account.
            <br />
            You can now setup your company units information .
          </p>
        )
      })
      push('units')
    } catch (error: any) {
      setIsLoading(false)
      toast({
        title: 'Error Occurred',
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardGrid>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="CEO Email here..."
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="CEO Account Password here..."
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardGrid>
        <CardGrid>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>CEO First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="CEO First Name here..."
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
                <FormLabel required>CEO Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="CEO Last Name here..."
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
