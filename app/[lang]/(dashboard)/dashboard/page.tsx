import { Card } from '@/components/card'
import { StatsCard } from '@/components/stats-card'

import { DateTimeBlock } from '@/components/date-time-block'
import { EmployeeTable } from '@/components/employee-table'
import { Icons } from '@/components/icons'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Locale } from '@/i18n.config'
import { authOptions } from '@/lib/auth'
import { cn, delay, formatDateTime } from '@/lib/utils'
import { EmployeeEntry, GoalEntry, StatsCardItem } from '@/types'
import { stat } from 'fs/promises'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// get data from json files
import { GoalTable } from '@/components/goals-table'
import { OrganizationalChartFrame } from './employees/org-chart/org-chart'
import { AUTH_ROLES } from '@/config/globals'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { conforms } from 'lodash'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale }
}

declare type Stats = { count: number; updateAt?: string }

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions)
  const {
    tables: { performance: tableTranslations },
    pages: {
      dashboard: { cardsList, chart }
    }
  } = await getDictionary(params.lang)
  const authRole = session?.user.role ?? 'ANYTHING'
  const api = await useServerApi()

  if (session?.user.role === AUTH_ROLES.HR && !session?.user.onBoarded)
    redirect('/dashboard/setup')

  const { data: orgData } = await api.get('/charts/org')
  if (authRole == AUTH_ROLES.EMPLOYEE)
    return <EmployeeDashboard params={params} orgData={orgData} />

  const { data: objectives } = await api.get<GoalEntry[]>('performance')

  const { data: employeesStats } = await api.get<Stats>('stats/employees')

  const { data: goalsStats } = await api.get<Stats>('stats/goals')

  const { data: idpsStats } = await api.get<Stats>('stats/idps')

  return (
    <div className="container py-6 flex flex-col gap-6">
      {/* date and time */}
      {['HR', 'CEO'].includes(authRole) && (
        <div className="flex justify-center sm:justify-start">
          <div className="w-52 sm:w-full ">
            <Carousel className="w-52 sm:w-fit flex">
              <CarouselContent className="">
                <CarouselItem className="w-1/2 sm:basis-1/3 ">
                  <StatsCard
                    data={{
                      icon: 'people',
                      title: cardsList['employees'],
                      stats: employeesStats?.count,
                      updateAt: employeesStats?.updateAt
                    }}
                  />
                </CarouselItem>
                <CarouselItem className="w-1/2 sm:basis-1/3 pl-6">
                  <StatsCard
                    data={{
                      icon: 'goal',
                      title: cardsList['objectives'],
                      stats: goalsStats?.count,
                      updateAt: goalsStats?.updateAt
                    }}
                  />
                </CarouselItem>
                <CarouselItem className="w-1/2 sm:basis-1/3 pl-6">
                  <StatsCard
                    data={{
                      icon: 'idp',
                      title: cardsList['idps'],
                      stats: idpsStats?.count,
                      updateAt: idpsStats?.updateAt
                    }}
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="flex sm:hidden" />
              <CarouselNext className="flex sm:hidden" />
            </Carousel>
          </div>
        </div>
      )}
      <Card className="flex flex-col gap-4 pb-2 pt-5">
        <div className="flex justify-between items-end ">
          <div className="flex gap-3 items-end ">
            <div className="flex-shrink-0">
              <Icons.orgChart
                className={cn(
                  'flex h-[1.4rem] w-[1.4rem] hover:text-primary fill-current'
                )}
              />
            </div>
            <span className="text-xl font-medium -mb-1">
              {chart['orgChart']}
            </span>

            <span className="hidden sm:flex text-xs font-normal text-gray-500 dark:text-gray-400 opacity-50">
              {'( updated ' +
                formatDateTime(
                  employeesStats?.updateAt || new Date().toISOString()
                ) +
                ' )'}
            </span>
          </div>
          {['HR', 'CEO'].includes(authRole) && (
            <div className="">
              <Link
                href="/dashboard/employees/org-chart"
                className="flex gap-3 items-center text-gray-500 hover:text-primary group"
              >
                <span className="text-sm group-hover:underline">
                  {chart['viewAll']}
                </span>
                <Icons.expend className="w-4 h-4 text-gray-500/70 group-hover:text-primary" />
              </Link>
            </div>
          )}
        </div>
        <div className="lg:hidden flex gap-3 justify-center items-center py-8">
          <Icons.sorryEmoji className=" w-4 h-4 md:w-5 md:h-5 text-muted-foreground/40" />
          <p className="flex text-xs  md:text-sm text-muted-foreground/40 ">
            {
              chart[
                'sorry-you-can-see-organizational-chart-only-in-big-screens'
              ]
            }
          </p>
        </div>
        {/* organization chart here */}
        <OrganizationalChartFrame
          t={chart}
          isHyperLinked={['HR', 'CEO'].includes(authRole)}
          data={orgData}
        />
      </Card>
      {session?.user.role != AUTH_ROLES.EMPLOYEE && (
        <Card className="pb-2 pt-5">
          <div className="flex justify-between items-end ">
            <div className="flex gap-3 items-end ">
              <div className="flex-shrink-0">
                <Icons.goal className={cn('flex h-[1.4rem] w-[1.4rem]')} />
              </div>
              <span className="text-xl font-medium -mb-1">{'Objectives'}</span>
              {goalsStats?.updateAt ? (
                <span className="hidden sm:flex text-xs font-normal text-gray-500 dark:text-gray-400 opacity-50">
                  {`(${formatDateTime(goalsStats?.updateAt || '')})`}
                </span>
              ) : (
                <span className="hidden sm:flex text-xs font-normal text-gray-500 dark:text-gray-400 opacity-50">
                  {'( Never Updated )'}
                </span>
              )}
            </div>
            <div className="">
              <Link
                href="/dashboard/goal/all"
                className="flex gap-3 items-center text-gray-500 hover:text-primary group"
              >
                <span className="text-sm group-hover:underline ">
                  {chart['viewAll']}
                </span>
                <Icons.expend className="w-4 h-4 text-gray-500/70 group-hover:text-primary" />
              </Link>
            </div>
          </div>
          <GoalTable t={tableTranslations} data={objectives} />
        </Card>
      )}
    </div>
  )
}

export default Page

interface EmployeeDashboardProps {
  params: { lang: Locale }
  orgData: any
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = async ({
  params,
  orgData
}: EmployeeDashboardProps) => {
  const {
    pages: {
      dashboard: { chart }
    }
  } = await getDictionary(params.lang)
  return (
    <div className="container py-6 flex flex-col gap-6">
      {/* date and time */}
      <Card className="flex flex-col gap-4 pb-2 pt-5">
        <div className="flex justify-between items-end ">
          <div className="flex gap-3 items-end ">
            <div className="flex-shrink-0">
              <Icons.orgChart
                className={cn(
                  'flex h-[1.4rem] w-[1.4rem] hover:text-primary fill-current'
                )}
              />
            </div>
            <span className="text-xl font-medium -mb-1">
              {chart['orgChart']}
            </span>

            <span className="hidden sm:flex text-xs font-normal text-gray-500 dark:text-gray-400 opacity-50">
              {'( updated ' +
                formatDateTime(orgData?.updateAt || new Date().toISOString()) +
                ' )'}
            </span>
          </div>
        </div>
        <div className="lg:hidden flex gap-3 justify-center items-center py-8">
          <Icons.sorryEmoji className=" w-4 h-4 md:w-5 md:h-5 text-muted-foreground/40" />
          <p className="flex text-xs  md:text-sm text-muted-foreground/40 ">
            {
              chart[
                'sorry-you-can-see-organizational-chart-only-in-big-screens'
              ]
            }
          </p>
        </div>
        {/* organization chart here */}
        <OrganizationalChartFrame
          t={chart}
          isHyperLinked={false}
          data={orgData}
        />
      </Card>
    </div>
  )
}
