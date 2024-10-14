import { Locale } from '@/i18n.config'
import { Card } from '@/components/card'
import { EditIdpForm } from './edit-idp-form'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { IdpEntry } from '@/types'
import { z } from 'zod'
import { IdpSchema } from '@/lib/validations/globals'

interface PageProps {
  params: { id: string; lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()

  const fetchData = async () => {
    const { data } = await api.get<z.infer<typeof IdpSchema>>(
      '/idps/' + params.id
    )
    return data
  }
  const data = await fetchData()

  return (
    <div className="pb-8">
      <Card className="">
        <EditIdpForm params={params} data={data} />
      </Card>
    </div>
  )
}

export default Page
