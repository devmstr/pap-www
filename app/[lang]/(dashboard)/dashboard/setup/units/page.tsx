import { Card } from '@/components/card'
import { DepartmentsCheckboxList } from './departments-form'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { ONBOARDING_DEPARTMENTS } from '@/config/on-boarding'

interface PageProps {
  params: {
    lang: Locale
  }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const {
    pages: {
      setup: {
        pages: { units }
      }
    }
  } = await getDictionary(params.lang)
  return (
    <Card className="space-y-6">
      <h1 className="font-inter text-foreground/80 font-black text-3xl">
        Setup Your Company Units.
      </h1>
      <p className="text-base text-muted-foreground/80 max-w-5xl">
        Choose the department configuration that aligns with your company's
        structure. If you don't see your department name in our default set, you
        have the option to create a new one by entering the department name and
        clicking the 'Add' button.
      </p>
      <DepartmentsCheckboxList
        t={units}
        params={params}
        items={ONBOARDING_DEPARTMENTS}
      />
    </Card>
  )
}

export default Page
