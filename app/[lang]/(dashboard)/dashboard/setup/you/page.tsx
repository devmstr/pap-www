import { Card } from '@/components/card'
import { Locale } from '@/i18n.config'
import { PersonalHrForm } from './personal-new-user-form'

interface PageProps {
  params: {
    lang: Locale
  }
}

const Page: React.FC<PageProps> = ({ params }: PageProps) => {
  return (
    <Card className="space-y-8">
      <h1 className="font-inter text-foreground/80 font-black text-3xl">
        Setup your Personal information ?
      </h1>
      <PersonalHrForm params={params} t={{}} />
    </Card>
  )
}

export default Page
