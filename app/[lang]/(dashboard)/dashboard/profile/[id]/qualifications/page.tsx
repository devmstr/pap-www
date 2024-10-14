import { Card } from '@/components/card'
import { QualificationTable } from '@/components/qualification-table'
import { z } from 'zod'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { AddQualificationDialog } from './add-qualification.dialog'
import { QualificationEntry } from '@/types'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { id: string; lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()

  const {
    tables: { qualifications: tt }
  } = await getDictionary(params.lang)

  const fetchData = async () => {
    const { data } = await api.get<QualificationEntry[]>(
      '/qualification/all/' + params.id
    )
    return data
  }

  const data = await fetchData()

  return (
    <div>
      <Card>
        <AddQualificationDialog params={params} />
        <QualificationTable t={tt} params={params} data={data} />
      </Card>
    </div>
  )
}

export default Page
