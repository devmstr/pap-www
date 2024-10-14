'use client'
import { CardFooter } from '@/components/card'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import {
  ChangePasswordType,
  ChangePasswordSchema
} from '@/lib/validations/globals'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface SecuritySettingFormProps {
  t?: Dictionary
}

export const SecuritySettingForm: React.FC<SecuritySettingFormProps> = ({
  t
}: SecuritySettingFormProps) => {
  const securityForm = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema)
  })

  const [isDataLoading, setIsDataLoading] = useState(false)

  const { data: session } = useSession()
  const { refresh } = useRouter()

  const api = useClientApi()

  async function onSubmit({
    oldPassword,
    currentPassword
  }: ChangePasswordType) {
    try {
      setIsDataLoading(true)
      if (!session) throw new Error('Session is not defined')

      const {
        data: { message }
      } = await api.post<{ message: string }>('/settings/security', {
        oldPassword,
        currentPassword
      })

      toast({
        title: 'Success!',
        description: <p>You have successfully updated you password </p>
      })

      refresh()
    } catch (error: any) {
      toast({
        title: 'Error!',
        description: <p>{error.response.data.error}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsDataLoading(false)
    }
  }
  return (
    <Form {...securityForm}>
      <form
        onSubmit={securityForm.handleSubmit(onSubmit)}
        className="space-y-4 mt-3"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex flex-col gap-2 full md:w-[25%]">
              <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
                {t['change-password']}
              </span>
              <p className="text-sm text-muted-foreground/70 md:max-w-48">
                {t['change-password-sub-paragraph']}
              </p>
            </div>
            <div className="flex flex-col w-full md:w-[75%]  max-w-xl gap-2">
              <div className="flex ">
                <div className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-muted-foreground ">
                  <Icons.password className="w-5 h-5 text-gray-400" />
                </div>
                <FormField
                  control={securityForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t['old-password']}
                          className="flex w-full  border-l-0 rounded-l-none
          focus-visible:ring-0  focus-visible:ring-offset-0"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex ">
                <div className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-muted-foreground ">
                  <Icons.password className="w-5 h-5 text-gray-400" />
                </div>
                <FormField
                  control={securityForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t['current-password']}
                          className="flex w-full  border-l-0 rounded-l-none
          focus-visible:ring-0  focus-visible:ring-offset-0"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex ">
                <div className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-muted-foreground ">
                  <Icons.password className="w-5 h-5 text-gray-400" />
                </div>
                <FormField
                  control={securityForm.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t['repeat-password']}
                          className="flex w-full  border-l-0 rounded-l-none
          focus-visible:ring-0  focus-visible:ring-offset-0"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="flex w-full justify-end">
          <div className="flex items-start w-full justify-between">
            <Link
              className="flex gap-1 items-center text-xs text-primary"
              href={'#'}
            >
              {t['privacy-policy']}
              <Icons.longArrowDown className="-rotate-90 text-primary w-3 h-auto" />
            </Link>
            <Button
              variant={'default'}
              className={'px-4 min-w-24'}
              type="submit"
            >
              {isDataLoading ? (
                <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                t['submit'] ?? 'Update'
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Form>
  )
}
