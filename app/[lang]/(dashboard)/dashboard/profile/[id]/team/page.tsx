import { Card } from '@/components/card'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { EmployeeEntry } from '@/types'
import { TeamTable } from './team-table'
import { Locale } from '@/i18n.config'
import { Loading } from '@/components/loading'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'
export const revalidate = 0

interface PageProps {
  params: { lang: Locale; id: string }
  searchParams: { search?: string; page?: string; per_page?: string }
}

const Page: React.FC<PageProps> = async ({
  params,
  searchParams
}: PageProps) => {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'
  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const api = await useServerApi()
  const {
    tables: { team: tt }
  } = await getDictionary(params.lang)
  const session = await getServerSession(authOptions)
  const role = session?.user.role || 'ANYTHING'
  const control = ['CEO', 'HR'].includes(role)

  const {
    data: { data, _count }
  } = await api.get<{ data: EmployeeEntry[]; _count: number }>(
    `team/members/${params.id}`
  )
  if (!data) <Loading />
  return (
    <Card>
      <TeamTable
        page={+page}
        per_page={+per_page}
        hasNextPage={end < _count}
        hasPrevPage={start > 0}
        t={tt}
        data={data}
        params={params}
        control={control}
      />
    </Card>
  )
}

export default Page
