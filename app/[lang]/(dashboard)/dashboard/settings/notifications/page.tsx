import { Card } from '@/components/card'
import { SettingsNotificationForm } from './settings-notification-form'
import { Locale } from '@/i18n.config'
import { redirect } from 'next/navigation'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const {
    pages: {
      settings: {
        pages: { notifications: t }
      }
    }
  } = await getDictionary(params.lang)
  // only for testing
  return (
    <Card>
      <h1 className="text-xl font-black font-inter">{t['title']}</h1>
      <p className="text-muted-foreground text-base">{t['sub-title']}.</p>
      <SettingsNotificationForm t={t.form} params={params} />
    </Card>
  )
}

export default Page
