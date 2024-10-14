import { Card } from '@/components/card'
import { AddSuccessionForm } from '../add-succession-form'
import { Locale } from '@/i18n.config'
import { EditSuccessionForm } from './edit-succession-form'
import useServerApi from '@/hooks/use-server-side-axios-auth'

interface PageProps {
  params: { lang: Locale; id: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()

  const fetchSuccessionPlan = async (id: string) => {
    const { data } = await api.get(`/succession/${id}`)
    return data
  }
  const successionPlan = await fetchSuccessionPlan(params.id)

  return (
    <Card>
      <EditSuccessionForm data={successionPlan} params={params} />
    </Card>
  )
}

export default Page
