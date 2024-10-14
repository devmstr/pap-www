import { Card } from '@/components/card'
import { Icons } from '@/components/icons'
import { OrganizationalChartFrame } from './org-chart'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n.config'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions)
  const isHyperLinked = ['HR', 'CEO'].includes(session?.user.role || 'ANYTHING')
  const api = await useServerApi()
  const {
    pages: {
      dashboard: { chart: t }
    }
  } = await getDictionary(params.lang)

  const fetchOrgData = async () => {
    const { data } = await api.get('/charts/org')
    return data
  }

  const orgData = await fetchOrgData()
  console.log(orgData)
  return (
    <div className="pb-16">
      <Card>
        <div className="lg:hidden flex gap-3 justify-center items-center py-8">
          <Icons.sorryEmoji className=" w-4 h-4 md:w-5 md:h-5 text-muted-foreground/40" />
          <p className="flex text-xs  md:text-sm text-muted-foreground/40 ">
            Sorry you can see organizational chart only in big screens.
          </p>
        </div>
        <OrganizationalChartFrame
          t={t}
          isHyperLinked={isHyperLinked}
          data={orgData}
        />
      </Card>
    </div>
  )
}

export default Page
