'use client'

import { CardFooter, CardGrid } from '@/components/card'
import { Icons } from '@/components/icons'
import { Selector } from '@/components/selector'
import { Slider } from '@/components/slider'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { POTENTIAL_LEVELS } from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import {
  PotentialRatingSchema,
  PotentialRatingSchemaType
} from '@/lib/validations/globals'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { ScrollArea } from './ui/scroll-area'
import { Dictionary } from '@/types'

interface EditPotentialFormProps {
  data: PotentialRatingSchemaType
  params: { lang: Locale; id?: string }
  t: Dictionary
}

const getLevelNameFromRating = (rating: number) => {
  if (rating < 5) {
    return 'Low'
  } else if (rating < 8) {
    return 'Medium'
  } else {
    return 'High'
  }
}

export const EditPotentialForm: React.FC<EditPotentialFormProps> = ({
  data,
  params: { lang, id },
  t
}: EditPotentialFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [expendedSkillName, setExpendedSkillName] = useState<string | null>(
    null
  )

  const form = useForm<PotentialRatingSchemaType>({
    defaultValues: data,
    resolver: zodResolver(PotentialRatingSchema)
  })

  const { fields } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'assessments' // unique name for your Field Array
  })
  const api = useClientApi()
  const router = useRouter()
  const { data: session } = useSession()

  async function onSubmit(formData: PotentialRatingSchemaType) {
    try {
      setIsLoading(true)

      const ratings = formData.assessments.map((assessment) => ({
        rating: assessment.rating,
        skillId: assessment.skillId,
        plan: assessment.plan,
        isBossRating: session?.user.sub != assessment.authId,
        authId: assessment.authId
      }))

      const res = await api.patch('/rating/performance/all', ratings)

      toast({
        title: 'Success',
        description: 'Your skill assessment has been updated'
      })

      router.refresh()
    } catch (error: any) {
      toast({
        title: error.error,
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 pr-1 pt-2"
      >
        <div className=" border rounded-md p-4 flex flex-col gap-4 ">
          <div className="flex flex-wrap gap-3 ">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`assessments.${index}.rating`}
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      'w-full flex flex-col gap-1.5 border rounded-md p-3 transition-all ease-in-out duration-700 delay-100'
                      // open && expendedSkillName === field.name
                      // ? 'w-full md:order-first'
                      // : 'w-full md:w-[calc(50%-0.39rem)] lg:w-[calc(33%-0.31rem)] md:order-none'
                    )}
                  >
                    <div className="flex justify-between">
                      <FormLabel className="select-none">
                        {form.getValues(`assessments.${index}.name`)}
                      </FormLabel>

                      <button
                        type="button"
                        className="flex gap-1 items-start text-xs group"
                        onClick={() => {
                          expendedSkillName === field.name
                            ? setOpen(!open)
                            : setOpen(true)
                          setExpendedSkillName(field.name)
                        }}
                      >
                        <span className="text-primary">
                          {!open ? t['expend'] : t['reduce']}
                        </span>
                        <Icons.chevronLeft
                          className={cn(
                            'w-4 h-4 rotate-90 group-hover:-rotate-90 text-primary',
                            open &&
                              expendedSkillName === field.name &&
                              '-rotate-90 group-hover:rotate-90'
                          )}
                        />
                      </button>
                    </div>
                    <div
                      className={cn(
                        open && expendedSkillName === field.name
                          ? 'flex flex-col gap-1'
                          : 'hidden'
                      )}
                    >
                      <p className="text-base text-muted-foreground select-none">
                        {form.getValues(`assessments.${index}.description`)}
                      </p>
                    </div>
                    <FormControl className="flex flex-col gap-3 h-full">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between w-full">
                          <span className="w-[40%] flex justify-start text-xs text-muted-foreground/50 select-none  ">
                            {t['low']}
                          </span>
                          <span className="w-[30%] flex justify-start text-xs text-muted-foreground/50 select-none  ">
                            {t['medium']}
                          </span>
                          <span className="w-[30%] flex justify-start text-xs text-muted-foreground/50 select-none  ">
                            {t['high']}
                          </span>
                        </div>
                        <Slider
                          value={[
                            form.getValues(`assessments.${index}.rating`)
                          ]}
                          onValueChange={(value) =>
                            form.setValue(
                              `assessments.${index}.rating`,
                              value[0]
                            )
                          }
                          className="mb-2"
                        />

                        <div
                          className={cn(
                            'border p-3 rounded-md text-foreground w-full min-h-16 bg-[#f3f3f3]/30 break-words prose-xl prose-p:text-base prose-p:leading-5 prose:font-inter prose-p:font-medium prose-li:text-muted-foreground prose-strong:text-lg prose-p:my-2 prose-ul:pl-5 prose-ul:my-3 prose-ol:pl-5 prose-ol:my-3 prose-li:text-base prose-ul:list-disc prose-ol:list-decimal',
                            open && expendedSkillName === field.name
                              ? 'block'
                              : 'hidden'
                          )}
                        >
                          <ReactMarkdown className="">
                            {
                              form
                                .getValues(`assessments.${index}.Levels`)
                                ?.find(
                                  (level) =>
                                    level.title ==
                                    getLevelNameFromRating(field.value)
                                )?.description
                            }
                          </ReactMarkdown>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-end gap-2">
          <div className="w-full h-[2px] bg-gray-200/60 " />
          <Button className={'md:w-[8rem] mt-1'} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            {t['submit']}
          </Button>
        </div>
      </form>
    </Form>
  )
}
