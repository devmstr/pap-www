import { Card } from '@/components/card'
import { SetupCeoForm } from './setup-ceo-form'
import { Locale } from '@/i18n.config'

interface PageProps {
  params: {
    lang: Locale
  }
}

const Page: React.FC<PageProps> = ({ params }: PageProps) => {
  return (
    <Card className="space-y-6">
      <h1 className="font-inter text-foreground/80 font-black text-3xl ">
        Setup your company CEO account.
      </h1>
      <p className="text-base text-muted-foreground/80 max-w-5xl">
        You need to create a CEO account for your company. We will send an email
        notification to the email address provided, where your CEO can log in to
        the CEO account. This account will provide access to important tools,
        insights, and updates relevant to your CEO's role within the company.
      </p>
      <SetupCeoForm params={params} />
    </Card>
  )
}

export default Page
