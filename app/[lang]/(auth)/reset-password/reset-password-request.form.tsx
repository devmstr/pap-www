'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import {
  resetPasswordRequestSchema,
  userLoginSchema
} from '@/lib/validations/auth'
import { Button, buttonVariants } from '@ui/button'
import { Input } from '@ui/input'
import { Label } from '@ui/label'
import { toast } from '@ui/use-toast'

import { useRouter } from 'next/navigation'
import { Loading } from '@/components/loading'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Dictionary } from '@/types'
import Link from 'next/link'

interface ResetPasswordRequestFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  t: Dictionary
  lang?: string
}

type FormData = z.infer<typeof resetPasswordRequestSchema>

export function ResetPasswordRequestForm({
  t,
  className,
  lang = 'en',
  ...props
}: ResetPasswordRequestFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordRequestSchema)
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await fetch(`/api/email/reset-password`, {
        // Add the API URL here
        body: JSON.stringify({
          email: formData.email.toLowerCase()
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast({
        title: 'Successfully Registered.',
        description:
          'Your reset password email has been send, you can check you email inbox from here.',
        action: (
          <div className="flex items-center gap-1 border border-input rounded-md px-2 py-1 text-primary">
            <Icons.mail className="mr-2 h-5 w-5" />
            <Link href={'https://www.' + formData.email.split('@')[1]}>
              {formData.email
                .split('@')[1]
                .split('.')[0]
                .charAt(0)
                .toUpperCase() +
                formData.email.split('@')[1]?.split('.')[0]?.slice(1)}
            </Link>
          </div>
        )
      })
    } catch (error: any) {
      // console.error(error)
      toast({
        title: 'Error Occurred',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {<Loading message="" isLoading={isLoading} />}
      <div className={cn('grid gap-6', className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t['email']}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t['input']}
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit">
              {t['submit']}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
