import { Card, Overlay } from '@/components/card'
import { QualificationTable } from '@/components/qualification-table'
import { Locale } from '@/i18n.config'

import useServerApi from '@/hooks/use-server-side-axios-auth'
import {
  CreateQualificationSchema,
  UpdateQualificationSchema
} from '@/lib/validations/globals'
import { z } from 'zod'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { QualificationEntry } from '@/types'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const session = await getServerSession(authOptions)
  const {
    tables: { qualifications: tt }
  } = await getDictionary(params.lang)

  const fetchData = async () => {
    if (session?.user.role == 'HR') {
      const { data } = await api.get<QualificationEntry[]>('/qualification/all')
      return data
    }
    const { data } = await api.get<QualificationEntry[]>(
      '/qualification/all/' + session?.user.sub
    )
    return data
  }

  const data = await fetchData()

  return (
    <Card>
      <QualificationTable t={tt} params={params} data={data} />
    </Card>
  )
}

export default Page
