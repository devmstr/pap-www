import { Card } from '@/components/card'
import { AccountSettingForm } from './account-setting-form'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { AccountSettingFormType } from '@/lib/validations/globals'
import { getDictionary } from '@/lib/dictionaries'
import { i18n, Locale } from '@/i18n.config'
import { UserImageReplacer } from './user-image-replacer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { cookies } from 'next/headers'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const api = await useServerApi()
  const localeCookie = cookies().get('next-lang')?.value as Locale
  const session = await getServerSession(authOptions)
  const {
    pages: {
      settings: {
        pages: { account: t }
      }
    }
  } = await getDictionary(params.lang)
  // get data
  const { data } = await api.get<AccountSettingFormType>('/settings/account')

  return (
    <Card className="flex flex-col space-y-4">
      {/* <SettingAccountForm /> */}
      <h1 className="text-xl font-black font-inter">{t['title']}</h1>
      <p className="text-muted-foreground text-base">{t['sub-title']}</p>

      {session?.user.image && (
        <UserImageReplacer imageUrl={session.user.image} t={t} />
      )}
      <AccountSettingForm
        t={t.form}
        data={{
          ...data,
          lang: localeCookie || i18n.defaultLocale
        }}
      />
    </Card>
  )
}

export default Page
