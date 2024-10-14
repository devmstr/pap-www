'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button, buttonVariants } from '@ui/button'
import { Input } from '@ui/input'
import { Label } from '@ui/label'
import { toast } from '@ui/use-toast'
import { cn } from '@/lib/utils'
import { userSignUpSchema } from '@/lib/validations/auth'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  Form
} from './ui/form'
import api from '@/lib/axios'
import { Dictionary } from '@/types'

interface UserSingUpFormProps extends React.HTMLAttributes<HTMLDivElement> {
  t: Dictionary
  searchParams: { [key: string]: string | string[] | undefined }
}

type FormData = z.infer<typeof userSignUpSchema>

export const UserSingUpForm: React.FC<UserSingUpFormProps> = ({
  t,
  className,
  searchParams,
  ...props
}: UserSingUpFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(userSignUpSchema)
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false)
  async function onSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      await api.post('/auth/register', {
        email: formData.email.toLowerCase(),
        displayName: formData.displayName,
        password: formData.password
      })

      await fetch(`/api/email/confirm`, {
        // Add the API URL here
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          displayName: formData.displayName
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      toast({
        title: 'Successfully Registered.',
        description:
          'Your account has been created. Please check your email to verify your account. ',
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
    } catch (error) {
      const axiosError = error as any
      toast({
        title: axiosError.response.data.error,
        description: axiosError.response.data.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t['email']}</FormLabel>
                  <FormControl>
                    <Input placeholder="email here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t['username']}</FormLabel>
                  <FormControl className="">
                    <Input
                      type={'text'}
                      placeholder="Username here..."
                      {...field}
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
                  <FormLabel>{t['password']}</FormLabel>
                  <FormControl className="">
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="password here..."
                        {...field}
                      />
                      <Icons.eye
                        className="absolute right-2 top-[0.85rem] w-4 h-4 text-foreground/40  cursor-pointer"
                        open={isPasswordVisible}
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 

              TODO: check box for marketing emails acceptance 
             
            */}
          </div>
          <Button className="w-full" type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            {t['register']}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t['or-continue-with']}
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'text-primary hover:text-primary'
        )}
        onClick={() => {
          setIsGoogleLoading(true)
          signIn('google', {
            callbackUrl: (searchParams.from as string) || '/dashboard'
          })
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </button>
    </div>
  )
}
