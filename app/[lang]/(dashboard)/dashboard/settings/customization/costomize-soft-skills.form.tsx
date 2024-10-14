'use client'
import { AutoComplete } from '@/components/auto-complete-input'
import { CardFooter } from '@/components/card'
import { Icons } from '@/components/icons'
import { SearchComboBox } from '@/components/search-combo-box'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { Dictionary, Skill } from '@/types'
import { useSession } from 'next-auth/react'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type SkillConfig = { id: string; name: string; isSelected: boolean }

type SkillWithValueField = Skill & { value: string }

interface DepartmentsCheckboxListProps {
  params: { lang: Locale }
  data: SkillWithValueField[]
  selected: string[]
  t: Dictionary
}

export function CustomizeSoftSkillsForm({
  data,
  selected,
  t,
  params: { lang }
}: DepartmentsCheckboxListProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const categories = [...new Set(data.map((s) => s.category))]
    .filter((c) => c)
    .map((c) => ({
      value: c
    }))

  categories.unshift({ value: 'All' })

  const [category, setCategory] = React.useState<string>(categories[0]?.value)

  const [autoCompleteData, setAutoCompleteData] = React.useState(data)

  const [viewedList, setViewedList] = React.useState<SkillConfig[]>([
    ...data
      .map((s) => {
        if (selected.includes(s.name)) return { ...s, isSelected: true }
        else return { ...s, isSelected: false }
      })
      .sort((a, b) =>
        a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1
      )
  ])

  const [value, setValue] = React.useState<string>('')

  useEffect(() => {
    const selected = viewedList.filter((s) => s.isSelected)
    if (category == 'All') {
      setViewedList([
        ...selected,
        ...data
          .filter((s) => !selected.map((s) => s.name).includes(s.name))
          .map((s) => ({ ...s, isSelected: false }))
          .sort((a, b) =>
            a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1
          )
      ])
      return
    } else {
      setViewedList([
        ...viewedList.filter((s) => s.isSelected),
        ...data
          .filter(
            (s) =>
              !selected.map((s) => s.name).includes(s.name) &&
              s.category == category
          )
          .map((e) => ({ ...e, isSelected: false }))
      ])
    }
  }, [category])

  const toggleIsSelected = (skill: SkillConfig) => {
    setViewedList([
      ...viewedList.map((s) => {
        if (s.id === skill.id) {
          s.isSelected = !s.isSelected
        }
        return s
      })
    ])
  }

  const onSelect = (v: string) => {
    setValue(v)
    const newSkill = data.find((d) => d.name === v)
    if (!newSkill) return
    const isSkillExist = viewedList.find((s) => s.id == newSkill.id)
    if (isSkillExist) {
      setValue('')
      viewedList.find((s) => s.id == newSkill.id)!.isSelected = true
      setViewedList(viewedList)
      return
    }
    setViewedList([...viewedList, { ...newSkill, isSelected: true }])
    setValue('')
  }

  const api = useClientApi()
  const { refresh } = useRouter()

  const { data: session } = useSession()

  async function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    if (!session) return
    try {
      e.preventDefault()
      setIsLoading(true)
      if (
        viewedList.filter((s) => s.isSelected).length < 5 ||
        viewedList.filter((s) => s.isSelected).length > 8
      ) {
        toast({
          title: 'Attention !',
          description: (
            <p>Soft skills configuration should be between 5 and 8.</p>
          ),
          variant: 'destructive'
        })
        // revalidateTag('MY_SOFT_SKILLS')
      }
      const postData = viewedList
        .filter((s) => s.isSelected)
        .map((s) => ({
          name: s.name
        }))
      const { data } = await api.put('/skill/me', postData)

      toast({
        title: 'Success!',
        description: 'You have successfully update your company soft skills.'
      })
      refresh()
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Conflict!',
        description: <p>{error.response.data.error}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-flow-row gap-4 sm:grid-flow-col sm:grid-cols-3">
        <AutoComplete
          items={autoCompleteData}
          setValue={onSelect}
          value={value}
          className="sm:col-span-2"
          placeholder={t['search-placeholder']}
        />
        <SearchComboBox
          topic="Category"
          className="w-full"
          setValue={setCategory}
          value={category}
          items={categories}
        />
      </div>
      <div className="flex gap-4 p-4 flex-wrap border rounded-md min-h-24">
        {viewedList.length > 0 ? (
          viewedList.toSpliced(25).map((budge) => (
            <Badge
              key={budge.id}
              variant={budge.isSelected ? 'default' : 'outline'}
              onClick={() => toggleIsSelected(budge)}
              className={cn(
                'flex gap-1 h-8 text-sm text-muted-foreground font-quicksand border-2 rounded-md border-dashed py-1 px-3 cursor-pointer transition-colors ease-in-out duration-500 text-nowrap ',
                budge.isSelected && 'text-primary'
              )}
            >
              {budge.isSelected && (
                <Icons.checkSquare className="w-4 h-4 text-primary" />
              )}
              {budge.name}
            </Badge>
          ))
        ) : (
          <p className="w-full flex justify-center items-center text-muted-foreground/40 font-inter font-medium text-xs">
            {t['no-result']}.
          </p>
        )}
        {viewedList.length > 25 && (
          <Badge
            key={''}
            variant={'outline'}
            onClick={() => {}}
            className={cn(
              'flex gap-1 h-8 text-lg text-muted-foreground font-quicksand border-2 rounded-md border-dashed py-1 px-3 cursor-pointer transition-colors ease-in-out duration-500 text-nowrap '
            )}
          >
            {'. . .'}
          </Badge>
        )}
      </div>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default" className="w-full md:w-[8rem]">
              {t['submit']}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t['warning']}</AlertDialogTitle>
              <AlertDialogDescription>
                {t['warning-paragraph']}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="px-6">
                {t['cancel']}
              </AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  t['update'] ?? 'Continue'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </div>
  )
}
