import { Card } from '@/components/card'
import { CompanySettingForm } from './company-setting-form'
import { Locale } from '@/i18n.config'
import { redirect } from 'next/navigation'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { settingCompanyType } from '@/lib/validations/globals'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  // only for testing
  const api = await useServerApi()
  const {
    pages: {
      settings: {
        pages: { company: t }
      }
    }
  } = await getDictionary(params.lang)
  const { data } = await api.get<settingCompanyType>('/company/me')
  return (
    <Card>
      <h1 className="text-xl font-black font-inter">{t['title']}</h1>
      <p className="text-muted-foreground text-base">{t['sub-title']}.</p>

      <CompanySettingForm data={data} t={t.form} params={params} />
    </Card>
  )
}

export default Page
