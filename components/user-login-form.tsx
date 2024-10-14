'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { userLoginSchema } from '@/lib/validations/auth'
import { Button, buttonVariants } from '@ui/button'
import { Input } from '@ui/input'
import { Label } from '@ui/label'
import { toast } from '@ui/use-toast'

import { useRouter } from 'next/navigation'
import { Loading } from './loading'
import { Checkbox } from './ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Dictionary } from '@/types'

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  t: Dictionary
}

type FormData = z.infer<typeof userLoginSchema>

export function UserLoginForm({ t, className, ...props }: UserLoginFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(userLoginSchema)
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false)
  const [isKeepMeLoggedIn, setIsKeepMeLoggedIn] = React.useState<boolean>(false)
  const { push } = useRouter()

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      const signInResult = await signIn('credentials', {
        email: data.email.toLowerCase(),
        password: data.password,
        keepMeLoggedIn: isKeepMeLoggedIn ? 'checked' : undefined,
        redirect: false,
        callbackUrl: '/dashboard'
      })

      if (!signInResult?.ok)
        throw new Error(
          'Wrong Credentials. Please check your email or password and try again.'
        )

      toast({
        title: 'Successfully Signed in.',
        description:
          'You have successfully signed in. Wait until you are redirected.'
      })

      push('/dashboard')
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
                        placeholder="email here..."
                        autoComplete="email"
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
                          autoComplete="current-password"
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
            <div className="flex items-center gap-2">
              <Checkbox
                id="keep-me-logged-in"
                checked={isKeepMeLoggedIn}
                onCheckedChange={(checked) =>
                  typeof checked == 'boolean'
                    ? setIsKeepMeLoggedIn(checked)
                    : setIsKeepMeLoggedIn(false)
                }
              />
              <Label
                htmlFor="keep-me-logged-in"
                className="text-sm cursor-pointer font-normal text-muted-foreground"
              >
                {t['keep-me-logged-in']}
              </Label>
            </div>
            <Button className="w-full" type="submit">
              {t['login-btn']}
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
              callbackUrl: '/dashboard'
            })
          }}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{' '}
          Google
        </button>
      </div>
    </>
  )
}
