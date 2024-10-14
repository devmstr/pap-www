'use client'
import { AutoComplete } from '@/components/auto-complete-input'
import { DatePicker } from '@/components/date-picker'
import { Icons } from '@/components/icons'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { UserAvatar } from '@/components/user-avatar'
import {
  DEFAULT_BRAND_IMG_PATH,
  EMPLOYEE_COUNT_SELECTIONS,
  INDUSTRIES
} from '@/config/globals'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Suspense, useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LazyMdxEditor } from '@/components/forward-ref-editor'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { useSession } from 'next-auth/react'
import useClientApi from '@/hooks/use-axios-auth'
import { useDropzone } from 'react-dropzone'
import Img from 'next/image'
import {
  settingCompanySchema,
  settingCompanyType
} from '@/lib/validations/globals'
import { Selector } from '@/components/selector'
interface CompanySettingFormProps {
  data: settingCompanyType
  t: Dictionary
  params: { lang: Locale }
}

export const CompanySettingForm: React.FC<CompanySettingFormProps> = ({
  data,
  t,
  params: { lang }
}: CompanySettingFormProps) => {
  const form = useForm<settingCompanyType>({
    defaultValues: data,
    resolver: zodResolver(settingCompanySchema)
  })

  const industry = form.watch('industry')
  const founded = form.watch('founded')
  const [isDataLoading, setIsDataLoading] = useState(false)
  const mdxEditorRef = useRef<MDXEditorMethods>(null)
  const { refresh } = useRouter()

  const { data: session } = useSession()
  const api = useClientApi()

  async function onSubmit({ description, ...formData }: settingCompanyType) {
    try {
      setIsDataLoading(true)
      const description =
        mdxEditorRef.current?.getMarkdown() != ''
          ? mdxEditorRef.current?.getMarkdown()
          : undefined

      const { data } = await api.patch('/company/me', {
        description,
        ...formData
      })
      toast({
        title: 'Success!',
        description: <p>You have successfully updated you company data.</p>
      })
      refresh()
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

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    data.image || (DEFAULT_BRAND_IMG_PATH as string)
  )

  const onDropCallback = async (acceptedFiles: Array<File>) => {
    try {
      if (!acceptedFiles[0]) return

      const file = new FileReader()
      // set preview
      file.onload = () => setPreview(file.result)
      file.readAsDataURL(acceptedFiles[0])

      const formData = new FormData()

      formData.append('image', acceptedFiles[0])

      // upload the image to server
      const { data } = await api.post<{ path: string }>(
        '/upload/brand',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      form.setValue('image', data.path)
      toast({
        title: 'Success!',
        description: 'You have successfully updated you company image.'
      })

      refresh()
    } catch (error) {
      console.log(error)
    }
  }
  const onDrop = useCallback(onDropCallback, [preview, setPreview])

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['jpeg', 'png', 'svg', 'jpg', 'webp']
    }
  })

  return (
    <div className="mt-6">
      <div className="h-[2px] w-full px-5 bg-muted/70 " />
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex flex-col gap-2 full md:w-1/5">
            <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
              {t['logo-picture']}
            </span>
            <p className="text-sm text-muted-foreground/70 md:max-w-48">
              {t['logo-picture-sub-title']}.
            </p>
          </div>
          <Suspense
            fallback={
              <Skeleton className={cn('w-14 h-14 bg-gray-100 rounded-full')} />
            }
          >
            <div className="flex justify-between  w-full md:w-4/5 max-w-xl  ">
              <div className="flex items-center justify-center">
                <div className="h-auto">
                  <div className="flex justify-start xl:justify-center items-center">
                    <div className="relative w-16  h-16 bg-gray-200 rounded-full border-[4px] border-gray-200 hover:border-primary/70    transition-all duration-700  ">
                      <div
                        className="relative  flex justify-center items-center w-full h-full group cursor-pointer "
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <Img
                          width={300}
                          height={300}
                          className="w-ful  h-full object-cover object-center rounded-full "
                          src={preview as string}
                          alt="pfp-image"
                          priority
                        />
                        <Icons.upload className="absolute  w-8 h-auto text-primary opacity-0 group-hover:opacity-90 transition-opacity duration-700 " />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-6 "
        >
          <div className="h-[2px] w-full px-5 bg-muted/70 " />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 md:flex-row">
              <span className="flex full md:w-1/5 items-center text-sm font-semibold font-inter text-foreground ">
                {t['company-name']}
              </span>
              <div className="flex  w-full md:w-4/5  max-w-xl ">
                <span className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-gray-400 whitespace-nowrap">
                  <Icons.editText className="w-5 h-5" />
                </span>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Company name"
                          className="flex w-full  border-l-0 rounded-l-none
          focus-visible:ring-0  focus-visible:ring-offset-0"
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
              <span className="flex full md:w-1/5 items-center text-sm font-semibold font-inter text-foreground ">
                {t['founded']}
              </span>
              <div className="flex  w-full md:w-4/5  max-w-xl ">
                <span className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-gray-400 whitespace-nowrap">
                  <Icons.calender className="w-5 h-5" />
                </span>
                <FormField
                  control={form.control}
                  name="founded"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <DatePicker
                          aria-labelledby="founded-date-picker"
                          className="rounded-l-none border-l-0"
                          onDateChange={(date) => {
                            form.setValue('founded', date.toISOString())
                          }}
                          date={founded ? new Date(founded) : new Date()}
                          locale={lang || 'en'}
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
              <span className="flex full md:w-1/5 items-center text-sm font-semibold font-inter text-foreground ">
                {t['industry']}
              </span>
              <div className="flex  w-full md:w-4/5  max-w-xl ">
                <span className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-gray-400 whitespace-nowrap">
                  <Icons.industry className="w-5 h-5" />
                </span>
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <AutoComplete
                          items={INDUSTRIES.map((i) => ({ id: i, value: i }))}
                          setValue={(v) => form.setValue('industry', v)}
                          value={industry || ''}
                          className="sm:col-span-2 rounded-l-none border-l-0 "
                          placeholder="Search for Industry..."
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
              <span className="flex full md:w-1/5 items-center text-sm font-semibold font-inter text-foreground ">
                {t['employee-count']}
              </span>
              <div className="flex  w-full md:w-4/5  max-w-xl ">
                <span className="flex h-full bg-gray-50 items-center  px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-gray-400 whitespace-nowrap">
                  <Icons.founders className="w-5 h-5" />
                </span>
                <FormField
                  control={form.control}
                  name="employeeCountCategory"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Selector
                          items={EMPLOYEE_COUNT_SELECTIONS}
                          {...field}
                          className="border-l-0 rounded-l-none"
                          setValue={(value) =>
                            form.setValue('employeeCountCategory', value)
                          }
                          value={field.value || EMPLOYEE_COUNT_SELECTIONS[0]}
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
              <span className="flex full md:w-1/5 items-center text-sm font-semibold font-inter text-foreground ">
                {t['company-description']}
              </span>
              <div className="flex  w-full md:w-4/5  max-w-xl ">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <LazyMdxEditor
                          ref={mdxEditorRef}
                          className=""
                          markdown={field.value || ''}
                          placeholder={
                            <p> {t['write-your-company-description']}...</p>
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
              <span className="flex full md:w-1/5 items-center text-sm font-semibold font-inter text-foreground ">
                {t['website-url']}
              </span>
              <div className="flex  w-full md:w-4/5  max-w-xl ">
                <span className="flex bg-gray-50 items-center h-10 px-3 rounded-md border border-input  rounded-r-none text-sm font-normal font-inter text-gray-400 whitespace-nowrap">
                  {'https://'}
                </span>
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="example.com"
                          className="flex w-full  border-l-0 rounded-l-none
          focus-visible:ring-0  focus-visible:ring-offset-0"
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
          </CardFooter>
        </form>
      </Form>
    </div>
  )
}
