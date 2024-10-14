import { Card } from '@/components/card'
import { CustomizeCompetencyForm } from './customize-competency.form'
import { Locale } from '@/i18n.config'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Competency, CompetencyRating } from '@/types'
import { DEFAULT_COMPETENCY_LEVELS } from '@/config/globals'

interface PageProps {
  params: { id: string; lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const { data } = await api.get<Competency>(`/competency/${params.id}`)
  const { data: sectors } = await api.get(`sector`)

  if (data.Levels && data.Levels.length < 5) {
    const titles = data.Levels.map((item) => item.title)
    const missingLevels = DEFAULT_COMPETENCY_LEVELS.filter(
      (item) => !titles.includes(item.title)
    )
    data.Levels = [...data.Levels, ...missingLevels]
  }

  return (
    <Card>
      <CustomizeCompetencyForm data={data} sectors={sectors} params={params} />
    </Card>
  )
}
export default Page
