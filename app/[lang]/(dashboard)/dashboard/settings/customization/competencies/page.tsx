import { Card } from '@/components/card'
import { CompetencyTable } from '@/components/competency-table'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { id: string; lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const {
    tables: { competency: tt }
  } = await getDictionary(params.lang)
  const { data: competencies } = await api.get('competency?custom=true')
  return (
    <Card>
      <CompetencyTable t={tt} data={competencies} params={params} />{' '}
    </Card>
  )
}

export default Page
