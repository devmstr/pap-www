'use client'
import { AutoComplete } from '@/components/auto-complete-input'
import { CardFooter } from '@/components/card'
import { Icons } from '@/components/icons'
import { SearchComboBox } from '@/components/search-combo-box'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import useClientApi from '@/hooks/use-axios-auth'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { CompetencyBadgeEntry, Dictionary, Skill } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type IteratorCompetency = {
  id: string
  name: string
  value: string
  isSelected: boolean
  requiredLevel: number
  sector: string
}

interface DepartmentsCheckboxListProps {
  params: { id?: string; lang: Locale }
  data: IteratorCompetency[]
  selected: IteratorCompetency[]
  t: Dictionary
}

export function AddCompetencyForm({
  data,
  selected,
  t,
  params: { id, lang }
}: DepartmentsCheckboxListProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const sectors = [...new Set(data.map((s) => s.sector))]
    .filter((c) => c) // remove undefine
    .map((c) => ({
      value: c
    }))

  sectors.unshift({ value: 'All' })

  const [sector, setSector] = React.useState<string>(sectors[0]?.value)

  const [viewedList, setViewedList] = React.useState<IteratorCompetency[]>([
    ...selected,
    ...data.sort((a, b) =>
      a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1
    )
  ])

  const [value, setValue] = React.useState<string>('')

  useEffect(() => {
    if (sector == 'All') {
      setViewedList([
        ...viewedList.filter((s) => s.isSelected),
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
              s.sector == sector
          )
          .map((e) => ({ ...e, isSelected: false }))
      ])
    }
  }, [sector])

  const toggleIsSelected = (skill: IteratorCompetency) => {
    setViewedList([
      ...viewedList.map((s) => {
        if (s.id === skill.id && !selected.find(({ id }) => id == skill.id)) {
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
      if (viewedList.filter((s) => s.isSelected).length < 1) {
        toast({
          title: 'Attention !',
          description: <p>You should at least select one competency.</p>,
          variant: 'destructive'
        })
      }
      const authId = id || session.user?.sub
      const postData = viewedList
        .filter((s) => s.isSelected && !selected.find(({ id }) => id == s.id))
        .map(({ id }) => ({
          id
        }))
      const { data } = await api.put(`/competency/auth/${authId}`, postData)
      refresh()
      toast({
        title: 'Thanks again !',
        description: <p>Competencies has been updated successfully.</p>
      })
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
    <div className="flex flex-col space-y-6 px-1 mt-6 ">
      <div className="grid grid-flow-row gap-4 sm:grid-flow-col sm:grid-cols-3">
        <AutoComplete
          items={data}
          setValue={onSelect}
          value={value}
          className="sm:col-span-2"
          placeholder={t['search-placeholder'] + '...'}
        />
        <SearchComboBox
          topic="Category"
          className="w-full"
          setValue={setSector}
          value={sector}
          items={sectors}
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
                budge.isSelected && 'text-primary',
                selected.find(({ id }) => id == budge.id) &&
                  'cursor-not-allowed'
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
            {t['no-result']}.{' '}
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
        <Button
          className={'w-full md:w-[8rem]'}
          onClick={onSubmit}
          variant={'default'}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            t['submit'] ?? 'Update'
          )}
        </Button>
      </CardFooter>
    </div>
  )
}
