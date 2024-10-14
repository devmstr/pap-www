'use client'

import { CardOperations } from '@/components/card-actions'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { Dictionary } from '@/types'

interface CompetencyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  params: { lang: Locale; id: string; competencyId: string }
  t?: Dictionary
  data: {
    name: string
    id: string
    performance: {
      job: number
      manager: number
      you: number
    }
  }
}

export const CompetencyCard: React.FC<CompetencyCardProps> = ({
  params,
  t,
  data: inputData,
  className
}: CompetencyCardProps) => {
  const [data, setData] = useState(inputData)

  useEffect(() => {
    setData(inputData)
  }, [inputData])

  return (
    <div
      className={cn(
        'flex flex-col  border rounded-md px-6 py-3 w-full',
        className
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="capitalize text-md">{data.name}</h3>
        <div className="flex gap-1">
          <CardOperations params={params} />
        </div>
      </div>
      <div className="border-b my-1 opacity-60"></div>
      <div className="flex flex-col gap-2 py-3">
        <div className="flex gap-2 items-center text-sm ">
          <span className="text-sm w-[5.2rem]">{t['job']}</span>
          <Progress
            value={(data.performance.job / 5) * 100}
            className={'h-[0.65rem] w-full  '}
            color="bg-primary"
          />
          <span>{data.performance.job + '/5'}</span>
        </div>
        <div className="flex gap-2 items-center text-sm ">
          <span className="text-sm w-[5.2rem]">{t['manager']}</span>
          <Progress
            value={(data.performance.manager / 5) * 100}
            className="h-[0.65rem] w-full"
          />
          <span>{data.performance.manager + '/5'}</span>
        </div>
        <div className="flex gap-2 items-center text-sm ">
          <span className="text-sm w-[5.2rem]">{t['employee']}</span>
          <Progress
            value={(data.performance.you / 5) * 100}
            className="h-[0.65rem] w-full"
          />
          <span>{data.performance.you + '/5'}</span>
        </div>
      </div>
    </div>
  )
}
