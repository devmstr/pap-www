import { Card } from '@/components/card'
import { CompetenciesSelector } from '@/components/competencies-selector'
import { CompetencyCard } from '@/components/competency-card'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Competency } from '@/types'
import { Loading } from '@/components/loading'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale; id: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const {
    pages: {
      profile: {
        pages: { competencies: t }
      }
    }
  } = await getDictionary(params.lang)
  const session = await getServerSession(authOptions)
  const role = session?.user.role || 'ANYTHING'

  const { data } = await api.get<Competency[]>(
    `/rating/competency/${params.id}`
  )
  const {
    data: { data: team }
  } = await api.get<{ data: { id: string }[] }>(
    `team/members/${session?.user.sub}`
  )

  const isBoss = team?.map((i) => i.id).includes(params.id)

  const competencies = data?.map(
    ({ id, name, requiredLevel: job, Ratings }) => ({
      id,
      name,
      performance: {
        job,
        manager: Ratings?.find(({ isBossRating }) => isBossRating)?.rating ?? 0,
        you:
          Ratings?.find(({ isBossRating }) => isBossRating == false)?.rating ??
          0
      }
    })
  )

  if (!competencies) return <Loading />
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-foreground">{t['title']}</h1>
        <p className="text-muted-foreground">{t['sub-title']}</p>
      </div>
      {(isBoss || ['HR', 'CEO'].includes(role)) && (
        <CompetenciesSelector data={data} params={params} />
      )}
      {competencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {competencies.map((competency, idx) => (
            <CompetencyCard
              t={t.card}
              params={{ ...params, competencyId: competency.id }}
              key={idx}
              data={competency}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center border rounded-md min-h-32">
          <h3 className="text-muted-foreground/40 animate-pulse">
            {t['no-competency-has-been-assigned-yet']}.{' '}
          </h3>
        </div>
      )}
    </Card>
  )
}

export default Page
