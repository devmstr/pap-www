import { Card } from '@/components/card'
import { IdpTable } from '@/components/idp-table'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { IdpEntry } from '@/types'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const {
    tables: { idps: tt }
  } = await getDictionary(params.lang)
  const { data } = await api.get<IdpEntry[]>(`/idps`)
  return (
    <Card>
      <IdpTable t={tt} data={data} />
    </Card>
  )
}

export default Page
