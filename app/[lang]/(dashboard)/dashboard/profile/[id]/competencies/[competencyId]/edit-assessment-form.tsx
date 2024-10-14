'use client'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { EXPERIENCE_LEVELS } from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import {
  EditAssessmentSchema,
  EditAssessmentType,
  EditCustomCompetencySchema,
  EditCustomCompetencyType
} from '@/lib/validations/globals'
import { Competency } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { headers } from 'next/headers'
import { CardGrid } from '@/components/card'

interface EditAssessmentFormProps {
  isEditable: boolean
  canMakeAssessment: boolean
  data: Competency & { isBossRating: boolean; plan: string; authId: string }
  params: { id: string; lang: Locale }
}

export const EditAssessmentForm: React.FC<EditAssessmentFormProps> = ({
  isEditable = false,
  canMakeAssessment = false,
  data,
  params: { lang, id }
}: EditAssessmentFormProps) => {
  const { data: session } = useSession()
  const api = useClientApi()
  const { refresh, back, push } = useRouter()
  const mdxEditorRef = useRef<MDXEditorMethods>(null)
  const form = useForm<EditAssessmentType>({
    defaultValues: {
      id: data.id,
      isBossRating: data.isBossRating,
      authId: data.authId,
      plan: data.plan,
      requiredLevel: data.requiredLevel,
      rating:
        data.Ratings?.find(({ isBossRating }) => !isBossRating)?.rating || 1
    },
    resolver: zodResolver(EditAssessmentSchema)
  })

  const rating = form.watch('rating')
  const requiredLevel = form.watch('requiredLevel')
  const [levels, setLevels] = useState(data.Levels)
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
    setLevels(
      levels?.map((level) => {
        if (level.title == selectedTab)
          return { ...level, description: mdxEditorRef.current?.getMarkdown() }
        return level
      })
    )
  }

  async function onSubmit({ requiredLevel, ...formData }: EditAssessmentType) {
    try {
      setIsLoading(true)
      await api.patch('rating', formData)
      await api.put(`competency/auth/${data.authId}`, [
        { id: data.id, requiredLevel }
      ])
      refresh()
      // back()
      toast({
        title: 'Success',
        description: 'You Assessment Updated successfully'
      })
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
        Edit Assessment
      </h1>
      <div className="flex flex-col gap-1 max-w-3xl text-md text-muted-foreground">
        <p>
          Please choose your experience level according to the level requirement
          description provided below.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="border rounded-md pt-7 pb-4 px-6 space-y-4">
            <CardGrid>
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel className="">
                      <div className="flex gap-2 items-center">
                        <span className="text-md">Your Level</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Selector
                        {...field}
                        className="w-full
                        disabled:border-none disabled:bg-gray-100 disabled:text-muted-foreground disabled:ring-0 disabled:focus-visible:ring-0  disabled:focus-visible:ring-offset-0
                        disabled:opacity-100 disabled:cursor-pointer"
                        items={EXPERIENCE_LEVELS}
                        value={EXPERIENCE_LEVELS[rating - 1]}
                        disabled={!canMakeAssessment}
                        setValue={(value) =>
                          form.setValue(
                            'rating',
                            EXPERIENCE_LEVELS.indexOf(value) + 1
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requiredLevel"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Required Level</FormLabel>
                    <FormControl>
                      <Selector
                        {...field}
                        className="w-full 
                        disabled:border-none disabled:bg-gray-100 disabled:text-muted-foreground disabled:ring-0 disabled:focus-visible:ring-0  disabled:focus-visible:ring-offset-0
                        disabled:opacity-100 disabled:cursor-pointer"
                        items={EXPERIENCE_LEVELS}
                        value={EXPERIENCE_LEVELS[requiredLevel! - 1]}
                        setValue={(value) =>
                          form.setValue(
                            'requiredLevel',
                            EXPERIENCE_LEVELS.indexOf(value) + 1
                          )
                        }
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardGrid>
            <div className="flex flex-col sm:flex-row justify-end gap-2 ">
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
            </div>
          </div>
        </form>
      </Form>
      <div className="space-y-4">
        <div
          className={cn(
            'border rounded-md  pb-7 px-6 space-y-4',
            isEditable && data.id != null ? 'pt-3' : 'pt-7'
          )}
        >
          {isEditable && data.id != null && (
            <div className="w-full flex justify-end ">
              <Link
                href={`/dashboard/settings/customization/competencies/${data.id}`}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'flex gap-3 items-center justify-center cursor-pointer group ring-0'
                )}
              >
                <Icons.edit className="w-4 h-4 group-hover:text-primary" />
              </Link>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-6 max-w-md">
            <Input
              placeholder="Title here..."
              className="disabled:border-none disabled:bg-gray-100 disabled:text-muted-foreground disabled:ring-0 disabled:focus-visible:ring-0  disabled:focus-visible:ring-offset-0
                        disabled:opacity-100 disabled:cursor-pointer"
              disabled={true}
              value={data.name}
            />
          </div>
          <Textarea
            disabled={true}
            placeholder="Competency Description..."
            className="flex w-full disabled:border-none disabled:bg-gray-100 disabled:text-muted-foreground disabled:ring-0 disabled:focus-visible:ring-0  disabled:focus-visible:ring-offset-0
                        disabled:opacity-100 disabled:cursor-pointer"
          >
            {data.description}
          </Textarea>

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
                  className=""
                  readOnly={true}
                  markdown={
                    levels?.find(({ title }) => title === selectedTab)
                      ?.description || ''
                  }
                  onChange={onMdxChange}
                  placeholder={
                    true ? (
                      <>
                        <strong>{selectedTab} :</strong>
                        <p>
                          Sorry, the level requirement has not been set yet...
                        </p>
                      </>
                    ) : (
                      <>
                        <strong>{levelName} :</strong>
                        <p>You can set the level requirements here.</p>
                      </>
                    )
                  }
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
