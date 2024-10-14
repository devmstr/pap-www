import { Card } from '@/components/card'
import { RadarChart } from '@/components/radar-chart'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'

import { EditPotentialDialog } from '@/components/edit-potential.dialog'
import { Loading } from '@/components/loading'
import { authOptions } from '@/lib/auth'
import { Skill, SkillRating } from '@/types'
import { getServerSession } from 'next-auth'
import { getDictionary } from '@/lib/dictionaries'
import { delay } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { lang: Locale; id: string }
}

type RatingsData = {
  you: SkillRating[]
  boss: SkillRating[]
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions)
  const {
    pages: {
      profile: {
        pages: { potential: t }
      }
    }
  } = await getDictionary(params.lang)
  const api = await useServerApi()

  const { data: skills } = await api.get<Skill[]>('/skill/me?include=levels')

  const {
    data: { data: team }
  } = await api.get<{ data: { id: string }[] }>(
    `team/members/${session?.user.sub}`
  )

  const { data: ratings } = await api.get<RatingsData>(
    `/rating/performance/${params.id}`
  )

  const isBoss = team.map((i) => i.id).includes(params.id)
  const isSamePerson = params.id === session?.user.sub

  const data = {
    labels: skills.map((skill) => skill.name),
    datasets: [
      {
        label: isSamePerson ? t['you'] : t['employee'],
        data:
          ratings.you.map((item) => item.rating) ??
          Array(skills.length).fill(0),
        backgroundColor: 'rgba(254, 88, 8, 0.2)',
        borderColor: 'rgb(254, 88, 8)',
        borderWidth: 1.5,
        hidden: false
      },
      {
        label: isSamePerson ? t['manager'] : isBoss ? t['you'] : t['his-boss'],
        data:
          ratings.boss.map((item) => item.rating) ??
          Array(skills.length).fill(0),
        backgroundColor: 'rgba(8, 174, 254, 0.2)',
        borderColor: 'rgb(8, 174, 254)',
        borderWidth: 1.5,
        hidden: false
      }
    ]
  }

  return (
    <Card className="flex gap-4 flex-col justify-center items-center">
      {(isBoss || isSamePerson) && (
        <EditPotentialDialog
          skills={skills}
          ratings={ratings}
          params={params}
        />
      )}
      <p className="flex md:hidden text-xs  md:text-sm text-muted-foreground/40 ">
        {t['sorry-you-can-see']}
      </p>
      <RadarChart className="hidden md:block" data={data} />
    </Card>
  )
}

export default Page
