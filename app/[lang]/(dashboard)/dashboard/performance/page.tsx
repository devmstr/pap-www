import { Card } from '@/components/card'
import { Locale } from '@/i18n.config'
import React from 'react'

import useServerApi from '@/hooks/use-server-side-axios-auth'
import { GoalEntry } from '@/types'
import { GoalTable } from '@/components/goals-table'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const session = await getServerSession(authOptions)
  const {
    tables: { performance: t }
  } = await getDictionary(params.lang)
  const authId = session?.user.sub

  const { data } = await api.get<GoalEntry[]>(`performance`)

  return (
    <Card>
      <GoalTable t={t} data={data} />
    </Card>
  )
}

export default Page
