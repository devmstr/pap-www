import { Card } from '@/components/card'
import { EditQualificationForm } from './edit-qualification-form'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { z } from 'zod'
import { UpdateQualificationSchema } from '@/lib/validations/globals'

interface PageProps {
  params: { lang: Locale; id: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()

  async function getQualification(id: string) {
    const { data } = await api.get<z.infer<typeof UpdateQualificationSchema>>(
      '/qualification/' + id
    )
    return data
  }

  const qualification = await getQualification(params.id)
  return (
    <div className="">
      <Card className="">
        <EditQualificationForm params={params} data={qualification!} />
      </Card>
    </div>
  )
}

export default Page
