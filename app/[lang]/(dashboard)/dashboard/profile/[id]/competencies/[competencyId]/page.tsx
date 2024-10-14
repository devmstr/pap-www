import { Card } from '@/components/card'
import { EditAssessmentForm } from './edit-assessment-form'
import { Locale } from '@/i18n.config'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Competency } from '@/types'
import { DEFAULT_COMPETENCY_LEVELS } from '@/config/globals'

interface PageProps {
  params: { id: string; lang: Locale; competencyId: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions)
  const api = await useServerApi()
  const role = session?.user?.role ?? ''

  const {
    data: { data: team }
  } = await api.get<{ data: { id: string }[] }>(
    `/team/members/${session?.user.sub}`
  )

  const isBoss = team.map((i) => i.id).includes(params.id)

  const { data } = await api.get<Competency>(
    `/competency/${params.competencyId}?authId=${params.id}`
  )

  if (data.Levels && data.Levels.length < 5) {
    const titles = data.Levels.map((item) => item.title)

    const missingLevels = DEFAULT_COMPETENCY_LEVELS.filter(
      (item) => !titles.includes(item.title)
    )
    data.Levels = [...data.Levels, ...missingLevels]
  }
  return (
    <Card>
      <EditAssessmentForm
        isEditable={['HR', 'CEO'].includes(role)}
        canMakeAssessment={params.id == session?.user.sub || isBoss}
        data={{
          ...data,
          authId: params.id,
          isBossRating: isBoss,
          plan: new Date().getFullYear().toString()
        }}
        params={params}
      />
    </Card>
  )
}
export default Page
