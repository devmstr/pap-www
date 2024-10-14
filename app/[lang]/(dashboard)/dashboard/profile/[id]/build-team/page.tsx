import { Card } from '@/components/card'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { EmployeeEntry } from '@/types'
import { BuildTeamTable } from './build-team-table'
import { Locale } from '@/i18n.config'
import { Loading } from '@/components/loading'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale; id: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const {
    tables: { buildTeam: tt }
  } = await getDictionary(params.lang)
  const session = await getServerSession(authOptions)
  const authId = params.id || session?.user.sub

  const { data: team } = await api.get<EmployeeEntry[]>(`team/${authId}`)

  if (!team) return <Loading />

  return (
    <Card>
      <BuildTeamTable t={tt} params={params} data={team} />
    </Card>
  )
}

export default Page
