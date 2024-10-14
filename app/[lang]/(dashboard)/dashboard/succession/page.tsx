import { Card } from '@/components/card'
import { AddSuccessionForm } from './add-succession-form'
import { SuccessionTable } from '@/components/succession-plan-table'
import { Locale } from '@/i18n.config'
import { AddSuccussionDialog } from './add-succession.dialog'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { SuccessionEntry } from '@/types'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const {
    tables: { succession: tt }
  } = await getDictionary(params.lang)

  const fetchData = async () => {
    const { data } = await api.get<SuccessionEntry[]>('/succession')
    return data
  }

  const successionPlans = await fetchData()

  return (
    <Card>
      <AddSuccussionDialog params={params} />
      <SuccessionTable t={tt} data={successionPlans} />
    </Card>
  )
}

export default Page
