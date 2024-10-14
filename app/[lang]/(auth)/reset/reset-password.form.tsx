'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Icons } from '@/components/icons'
import { cn, delay } from '@/lib/utils'
import { resetPasswordSchema } from '@/lib/validations/auth'
import { Button, buttonVariants } from '@ui/button'
import { Input } from '@ui/input'
import { Label } from '@ui/label'
import { toast } from '@ui/use-toast'

import { useRouter } from 'next/navigation'
import { Loading } from '@/components/loading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Dictionary } from '@/types'
import axios from '@/lib/axios'

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
  t: Dictionary
  lang?: string
  token?: string
  email?: string
}

type FormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm({
  t,
  className,
  email,
  token,
  lang = 'en',
  ...props
}: ResetPasswordFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema)
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false)
  const { push } = useRouter()

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const { data, status } = await axios.post(`/email/reset`, {
        email,
        rToken: token,
        password: formData.password
      })
      toast({
        title: 'Success.',
        description:
          'Your account password has bien reset successfully, Thanks.'
      })
      await delay(1000)
      push('/')
    } catch (error: any) {
      console.log(error.response?.data.error)
      toast({
        title: 'Error',
        description: error.response?.data.error,
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t['password']}</FormLabel>
                    <FormControl className="">
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder={t['password-placeholder']}
                          {...field}
                        />
                        <Icons.eye
                          className="absolute right-2 top-[0.85rem] w-4 h-4 text-foreground/40  cursor-pointer"
                          open={isPasswordVisible}
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t['confirm']}</FormLabel>
                    <FormControl className="">
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder={t['confirm-placeholder']}
                          {...field}
                        />
                        <Icons.eye
                          className="absolute right-2 top-[0.85rem] w-4 h-4 text-foreground/40  cursor-pointer"
                          open={isPasswordVisible}
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        />
                      </div>
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
