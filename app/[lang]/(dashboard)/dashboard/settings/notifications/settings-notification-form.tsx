'use client'
import { Locale } from '@/i18n.config'
import { Dictionary } from '@/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Icons } from '@/components/icons'
import { CardFooter } from '@/components/card'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface SettingsNotificationFormProps {
  t: Dictionary
  params: { lang: Locale }
}

const settingNotificationsSchema = z.object({
  goals: z.object({
    push: z.boolean().optional(),
    email: z.boolean().optional(),
    sms: z.boolean().optional()
  }),
  idps: z.object({
    push: z.boolean().optional(),
    email: z.boolean().optional(),
    sms: z.boolean().optional()
  }),
  userData: z.object({
    push: z.boolean().optional(),
    email: z.boolean().optional(),
    sms: z.boolean().optional()
  })
})

type settingNotificationsType = z.infer<typeof settingNotificationsSchema>

export const SettingsNotificationForm: React.FC<
  SettingsNotificationFormProps
> = ({ t, params: { lang } }: SettingsNotificationFormProps) => {
  const [isDataLoading, setIsDataLoading] = useState(false)

  const settingNotificationsForm = useForm<settingNotificationsType>({
    defaultValues: {
      goals: {
        push: true,
        email: false,
        sms: false
      },
      idps: {
        push: true,
        email: false,
        sms: false
      },
      userData: {
        push: true,
        email: false,
        sms: false
      }
    },
    resolver: zodResolver(settingNotificationsSchema)
  })

  const router = useRouter()
  async function onSubmit(formData: settingNotificationsType) {
    try {
      setIsDataLoading(true)
      router.refresh()
      console.log(formData)
    } catch (error: any) {
      toast({
        title: error.response.data.error,
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsDataLoading(false)
    }
  }
  return (
    <Form {...settingNotificationsForm}>
      <form
        onSubmit={settingNotificationsForm.handleSubmit(onSubmit)}
        className="space-y-4 mt-6 "
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 xl:gap-8 justify-between md:max-w-[65%] lg:max-w-[50%] xl:max-w-[45%]">
            <div className="flex flex-col gap-2">
              <span className=" text-sm font-semibold font-inter text-foreground ">
                {t['performance-goals']}
              </span>
              <p className="text-sm text-muted-foreground/70">
                {t['performance-goals-sub-title']}
                <br />
                {t['performance-goals-sub-paragraph']}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-end">
              <FormField
                control={settingNotificationsForm.control}
                name="goals.push"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['push']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue('goals.push', v)
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={settingNotificationsForm.control}
                name="goals.email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['email']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue('goals.email', v)
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={settingNotificationsForm.control}
                name="goals.sms"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['sms']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue('goals.sms', v)
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full px-5 bg-muted/70 " />
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 xl:gap-8 justify-between md:max-w-[65%] lg:max-w-[50%] xl:max-w-[45%]">
            <div className="flex flex-col gap-2">
              <span className=" text-sm font-semibold font-inter text-foreground ">
                {t['idps-goals']}
              </span>
              <p className="text-sm text-muted-foreground/70">
                {t['idps-goals-sub-title']}
                <br />
                {t['idps-goals-sub-paragraph']}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-end">
              <FormField
                control={settingNotificationsForm.control}
                name="idps.push"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['push']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue('idps.push', v)
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={settingNotificationsForm.control}
                name="idps.email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['email']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue('idps.email', v)
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={settingNotificationsForm.control}
                name="idps.sms"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['sms']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue('idps.sms', v)
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full px-5 bg-muted/70 " />
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 xl:gap-8 justify-between md:max-w-[65%] lg:max-w-[50%] xl:max-w-[45%]">
            <div className="flex flex-col gap-2">
              <span className=" text-sm font-semibold font-inter text-foreground ">
                {t['employee-information']}
              </span>
              <p className="text-sm text-muted-foreground/70">
                {t['employee-information-sub-title']}
                <br />
                {t['employee-information-sub-paragraph']}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-end mb-8">
              <FormField
                control={settingNotificationsForm.control}
                name="userData.push"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['push']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue(
                              'userData.push',
                              v
                            )
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={settingNotificationsForm.control}
                name="userData.email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['email']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue(
                              'userData.email',
                              v
                            )
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={settingNotificationsForm.control}
                name="userData.sms"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground/70 min-w-10">
                          {t['sms']}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(v) =>
                            settingNotificationsForm.setValue('userData.sms', v)
                          }
                          className="scale-75"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <CardFooter className="flex w-full justify-end">
          <Popover>
            <PopoverTrigger
              className={cn(
                buttonVariants({ variant: 'default' }),
                'px-4 min-w-24'
              )}
            >
              {t['submit'] ?? 'Update'}
            </PopoverTrigger>
            <PopoverContent className="max-w-xs mt-2">
              {t['soon-message']}
            </PopoverContent>
          </Popover>
        </CardFooter>
      </form>
    </Form>
  )
}
