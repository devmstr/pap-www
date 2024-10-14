'use client'

import { CardFooter } from '@/components/card'
import { LazyMdxEditor } from '@/components/forward-ref-editor'
import { Icons } from '@/components/icons'
import { Selector } from '@/components/selector'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { EXPERIENCE_LEVELS } from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { Competency } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import {
  EditCompetencySchema,
  EditCompetencyType
} from '@/lib/validations/globals'
import { AutoComplete } from '@/components/auto-complete-input'
import z from 'zod/lib'

interface CustomizeCompetencyFormProps {
  data: Competency
  sectors: { id: string; title: string }[]
  params: { id: string; lang: Locale }
}

export const CustomizeCompetencyForm: React.FC<
  CustomizeCompetencyFormProps
> = ({ data, sectors, params: { lang, id } }: CustomizeCompetencyFormProps) => {
  const { data: session } = useSession()
  const api = useClientApi()
  const { refresh, back, push } = useRouter()
  const mdxEditorRef = useRef<MDXEditorMethods>(null)

  const form = useForm<EditCompetencyType>({
    defaultValues: {
      id: data.id,
      name: data.name,
      description: data.description,
      Levels: data.Levels,
      sector: data.Sectors[0]?.title
    },
    resolver: zodResolver(EditCompetencySchema)
  })

  const levels = form.watch('Levels')
  const sector = form.watch('sector')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(EXPERIENCE_LEVELS[0])

  useEffect(
    () =>
      mdxEditorRef.current?.setMarkdown(
        levels?.find(({ title }) => title === selectedTab)?.description || ''
      ),
    [selectedTab]
  )

  function onMdxChange(markdown: string) {
    form.setValue(
      'Levels',
      levels?.map((level) => {
        if (level.title == selectedTab)
          return { ...level, description: mdxEditorRef.current?.getMarkdown() }
        return level
      })
    )
  }

  async function onSubmit({
    Levels,
    requiredLevel,
    ...formData
  }: EditCompetencyType) {
    try {
      setIsLoading(true)
      const { data } = await api.patch(`competency/${id}`, {
        ...formData,
        Levels: levels
      })
      toast({
        title: 'Success',
        description: 'Competency Updated Successfully successfully'
      })
      refresh()
    } catch (error: any) {
      toast({
        title: 'Error Occurred',
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-inter font-bold text-foreground">
        Edit Competency
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="border rounded-md py-7 px-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Title here..."
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required className="font-inter text-foreground">
                      Sector
                    </FormLabel>
                    <FormControl>
                      <AutoComplete
                        items={sectors.map(({ id, title }) => ({
                          id,
                          value: title
                        }))}
                        setValue={(v) => form.setValue('sector', v)}
                        value={sector || ''}
                        className="input-disabled sm:col-span-2"
                        placeholder="Search for Sector..."
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Competency Description..."
                      className="flex w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* divider */}
            <div className="border-b-2 py-2 opacity-60  " />
            <Tabs
              defaultValue={EXPERIENCE_LEVELS[0]}
              className=""
              onValueChange={setSelectedTab}
            >
              <TabsList className="bg-[#f0f0f3]">
                {EXPERIENCE_LEVELS.map((levelName) => (
                  <TabsTrigger key={levelName} value={levelName}>
                    {levelName}
                  </TabsTrigger>
                ))}
              </TabsList>
              {EXPERIENCE_LEVELS.map((levelName) => (
                <TabsContent key={levelName} value={levelName}>
                  <LazyMdxEditor
                    ref={mdxEditorRef}
                    markdown={
                      levels?.find(({ title }) => title === selectedTab)
                        ?.description || ''
                    }
                    onChange={onMdxChange}
                    placeholder={
                      <>
                        <strong>{selectedTab} :</strong>
                        <p>
                          Sorry, the level requirement has not been set yet...
                        </p>
                      </>
                    }
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <CardFooter className="flex flex-col sm:flex-row p-4">
            <Button
              variant={'outline'}
              onClick={(e) => {
                e.preventDefault()
                back()
              }}
              className={cn('w-full md:w-[8rem]')}
            >
              Back
            </Button>
            <Button className={'w-full md:w-[8rem]'} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
              )}
              Update
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  )
}
