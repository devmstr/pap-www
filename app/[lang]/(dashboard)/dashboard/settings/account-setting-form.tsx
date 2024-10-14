'use client'

import { LazyMdxEditor } from '@/components/forward-ref-editor'
import { Icons } from '@/components/icons'
import { Selector } from '@/components/selector'
import { Input } from '@/components/ui/input'
import { UserAvatar } from '@/components/user-avatar'
import { DEFAULT_PFP_IMG_PATH, LOCALES } from '@/config/globals'
import { toCapitalize, cn, delay } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Skeleton from 'react-loading-skeleton'
import { useSession } from 'next-auth/react'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { CardFooter } from '@/components/card'
import { Dictionary } from '@/types'
import {
  AccountSettingFormType,
  AccountSettingFormSchema
} from '@/lib/validations/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { useDropzone } from 'react-dropzone'
import Img from 'next/image'
import { toast } from '@/components/ui/use-toast'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { i18n, Locale } from '@/i18n.config'

interface AccountSettingFormProps {
  t: Dictionary
  data: AccountSettingFormType
}

export const AccountSettingForm: React.FC<AccountSettingFormProps> = ({
  t,
  data
}: AccountSettingFormProps) => {
  const accountForm = useForm<AccountSettingFormType>({
    defaultValues: {
      lang: data.lang,
      backupEmail: data?.backupEmail || '',
      bio: data?.bio || '',
      username: data?.username || ''
    },
    resolver: zodResolver(AccountSettingFormSchema)
  })
  const { data: session, update } = useSession()

  const [isDataLoading, setIsDataLoading] = useState(false)

  const mdxEditorRef = useRef<MDXEditorMethods>(null)

  const lang = accountForm.watch('lang')

  const api = useClientApi()

  const pathname = usePathname()

  async function onSubmit({ lang, ...formData }: AccountSettingFormType) {
    try {
      setIsDataLoading(true)

      const bio =
        mdxEditorRef.current?.getMarkdown() != ''
          ? mdxEditorRef.current?.getMarkdown()
          : undefined

      const { data: res } = await api.patch('/settings/account', {
        ...formData,
        bio
      })
      await update(session)
      toast({
        title: 'Success !',
        description: 'You have successfully updated your account settings.'
      })
      if (lang != data.lang) {
        const redirectPath = `/${lang?.toLowerCase()}/${pathname
          .split('/')
          .splice(2)
          .join('/')}`
        fetch(
          `/api/set-lang?locale=${lang?.toLowerCase()}&redirect=${encodeURIComponent(
            redirectPath
          )}`,
          {
            method: 'GET'
          }
        )
        window.location.href = redirectPath
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsDataLoading(false)
    }
  }

  useEffect(() => {
    if (mdxEditorRef.current) mdxEditorRef.current.setMarkdown(data.bio || '')
  }, [])

  return (
    <Form {...accountForm}>
      <form
        onSubmit={accountForm.handleSubmit(onSubmit)}
        className="space-y-4 mt-4"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex flex-col gap-2 full md:w-1/5">
              <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
                {t['language']}
              </span>
              <p className="text-sm text-muted-foreground/70 md:max-w-48">
                {t['chose-your-preferred-language']}
              </p>
            </div>

            <div className="flex w-full md:w-4/5  max-w-xl ">
              <div className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-muted-foreground ">
                <Icons.languages className="w-5 h-5 text-gray-400" />
              </div>
              <Selector
                topic="languages"
                setValue={(v) => {
                  accountForm.setValue('lang', v.toLowerCase() as Locale)
                }}
                value={
                  lang ? toCapitalize(lang) : toCapitalize(i18n.defaultLocale)
                }
                items={i18n.locales.map((locale) => toCapitalize(locale))}
                className="flex w-full  border-l-0 rounded-l-none
          focus-visible:ring-0  focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full px-5 bg-muted/70 " />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <span className="flex full md:w-1/5 items-center text-sm font-semibold font-inter text-foreground ">
              {t['username']}
            </span>
            <div className="flex  w-full md:w-4/5  max-w-xl ">
              <span className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-gray-400 whitespace-nowrap">
                {'profile/'}
              </span>
              <FormField
                control={accountForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="username"
                        className="flex w-full  border-l-0 rounded-l-none
                        focus-visible:ring-0 focus-visible:ring-offset-0"
                        onChange={({ target: { value: v } }) => {
                          v.length > 0
                            ? accountForm.setValue('username', v)
                            : accountForm.setValue('username', undefined)
                        }}
                      />
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
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex flex-col gap-2 full md:w-1/5">
              <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
                {t['your-bio']}
              </span>
              <p className="text-sm text-muted-foreground/70 md:max-w-48">
                {t['write-a-short-bio']}
              </p>
            </div>

            <div className="w-full md:w-4/5 max-w-xl">
              <FormField
                control={accountForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <LazyMdxEditor
                        ref={mdxEditorRef}
                        className=""
                        markdown={field.value ?? ''}
                        placeholder={
                          <p>{t['write-a-small-biography-about-you']}...</p>
                        }
                      />
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
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex flex-col gap-2 full md:w-1/5">
              <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
                {t['backup-email']}
              </span>
              <p className="text-sm text-muted-foreground/70 md:max-w-48">
                {t["enter-an-alternative-email-if-you'd-like-to"]}
              </p>
            </div>

            <div className="flex w-full md:w-4/5  max-w-xl ">
              <div className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-muted-foreground ">
                <Icons.mail className="w-5 h-5 text-gray-400" />
              </div>
              <FormField
                control={accountForm.control}
                name="backupEmail"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@example.com"
                        className="flex w-full  border-l-0 rounded-l-none
          focus-visible:ring-0  focus-visible:ring-offset-0"
                        onChange={({ target: { value: v } }) => {
                          v.length > 0
                            ? accountForm.setValue('backupEmail', v)
                            : accountForm.setValue('backupEmail', undefined)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <CardFooter className="flex w-full justify-end">
          <Button variant={'default'} className={'px-4 min-w-24'} type="submit">
            {isDataLoading ? (
              <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              t['submit'] ?? 'Update'
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
