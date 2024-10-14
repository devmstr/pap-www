'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
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
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { delay } from '@/lib/utils'
import { CompetencyEntry, Dictionary } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Selector } from '@/components/selector'
import { EXPERIENCE_LEVELS, INDUSTRIES } from '@/config/globals'
import { LazyMdxEditor } from '@/components/forward-ref-editor'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { CardFooter } from '@/components/card'
import { AutoComplete } from '@/components/auto-complete-input'
import { Textarea } from '@/components/ui/textarea'
import { UnitsTable } from './units.table'
import { CompetencyTable } from '@/components/competency-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const LevelSchema = z.object({
  id: z.string(),
  title: z.string(),
  weight: z.number().min(1).max(5), // Assuming weight should be between 1 and 5
  description: z.string().optional()
})

const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  sector: z.string(),
  Levels: z.array(LevelSchema).optional()
})

interface AddCustomCompetencyFormProps {
  sectors: { id: string; title: string }[]
  params: { lang: Locale }
  t: Dictionary
}

export function AddCustomCompetencyForm({
  sectors,
  t,
  params
}: AddCustomCompetencyFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const mdxEditorRef = useRef<MDXEditorMethods>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      Levels: [
        {
          id: '',
          title: 'Entry',
          weight: 1,
          description: ''
        },
        {
          id: '',
          title: 'Beginner',
          weight: 2,
          description: ''
        },
        {
          id: '',
          title: 'Intermediate',
          weight: 3,
          description: ''
        },
        {
          id: '',
          title: 'Advanced',
          weight: 4,
          description: ''
        },
        {
          id: '',
          title: 'Expert',
          weight: 5,
          description: ''
        }
      ]
    },
    resolver: zodResolver(FormSchema)
  })
  const sector = form.watch('sector')
  const levels = form.watch('Levels')
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

  const api = useClientApi()

  async function onSubmit({ Levels, ...formData }: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true)
      console.log(levels)
      const { data } = await api.post('competency?custom=true', {
        ...formData,
        Levels: levels
      })
      toast({
        title: 'Success.',
        description: <p>Your custom competency has been added successfully!</p>
      })
    } catch (error: any) {
      toast({
        title: 'Error Occurred!',
        description: <p>{error.response.data.error}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-4 px-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-2 min-w-xs w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required>{t['title']}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Competency Name..."
                        className="flex w-full"
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
                      {t['sector']}
                    </FormLabel>
                    <FormControl>
                      <AutoComplete
                        items={sectors.map(({ id, title }) => ({
                          id,
                          value: title
                        }))}
                        setValue={(v) => form.setValue('sector', v)}
                        value={sector || ''}
                        className="sm:col-span-2"
                        placeholder="Search for Sector..."
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
                  <FormLabel>{t['description']}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t['description-placeholder'] + '...'}
                      className="flex w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* divider */}
          <div className="border-b-2 py-2 opacity-60  "></div>
          <div className="flex flex-col gap-1">
            <h1 className="text-md font-bold font-inter">
              {t['levels-requirements']}
            </h1>
            <p className="text-muted-foreground text-md ">
              {t['levels-requirements-sub-paragraph']}
            </p>
          </div>
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
              <TabsContent value={levelName}>
                <LazyMdxEditor
                  key={levelName}
                  ref={mdxEditorRef}
                  markdown={
                    levels?.find(({ title }) => title === selectedTab)
                      ?.description || ''
                  }
                  onChange={onMdxChange}
                  placeholder={
                    <>
                      <strong>{selectedTab} :</strong>
                      <p> {t['levels-requirements-placeholder']}.</p>
                    </>
                  }
                />
              </TabsContent>
            ))}
          </Tabs>

          <CardFooter>
            <Button className="w-fit" variant={'default'}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                t['submit'] ?? 'Add'
              )}
            </Button>
          </CardFooter>
          <div className="h-[2px] w-full px-5 bg-muted/70 " />
        </form>
      </Form>
    </div>
  )
}
