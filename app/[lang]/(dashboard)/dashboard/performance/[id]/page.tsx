import { Card } from '@/components/card'
import { Locale } from '@/i18n.config'
import { EditGoalForm } from './edit-goal-form'
import useServerApi from '@/hooks/use-server-side-axios-auth'

interface PageProps {
  params: { id: string; lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  

  async function getPerformance(id: string) {
    const { data } = await api.get('/performance/' + id)
    return data
  }
  const data = await getPerformance(params.id)
  return (
    <div className="pb-8">
      <Card className="">
        <EditGoalForm params={params} data={data} />
      </Card>
    </div>
  )
}

export default Page
