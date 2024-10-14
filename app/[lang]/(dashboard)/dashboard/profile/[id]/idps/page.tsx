import { Card } from '@/components/card'
import { IdpTable } from '@/components/idp-table'
import { Locale } from '@/i18n.config'
import { IdpEntry } from '@/types'
import { AddIdpsDialog } from './add-idps.dialog'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale; id: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions)
  const {
    tables: { idps: tt }
  } = await getDictionary(params.lang)
  const authRole = session?.user.role ?? 'ANYTHING'

  const api = await useServerApi()

  const fetchData = async () => {
    const { data } = await api.get<IdpEntry[]>(`idps?authId=${params.id}`)
    return data
  }

  const data = await fetchData()

  return (
    <Card>
      {['HR', 'MANAGER', 'CEO', 'HRD'].includes(authRole) && (
        <AddIdpsDialog params={params} />
      )}
      <IdpTable t={tt} data={data} />
    </Card>
  )
}

export default Page
