import { Card } from '@/components/card'

import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { SetupCompanyForm } from './setup-company-form'

import api from '@/lib/axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { SetupCompanySchema } from '@/lib/validations/company-setup'
import useServerApi from '@/hooks/use-server-side-axios-auth'

interface PageProps {
  params: { lang: Locale }
}

async function fetchData() {
  const api = await useServerApi()
  try {
    const { data } = await api.get<z.infer<typeof SetupCompanySchema>>(
      '/company/me'
    )
    return data
  } catch (e) {}
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const {
    pages: {
      setup: {
        pages: { company }
      }
    }
  } = await getDictionary(params.lang)

  const data = await fetchData()

  return (
    <div className="">
      <Card className="space-y-6">
        <h1 className="font-inter text-foreground/80 font-black text-3xl  ">
          Tell Us About Your Company.
        </h1>
        <p className="text-base text-muted-foreground/80 max-w-5xl">
          List your company information here to customize your experience
          according to your industry. We understand that every company is
          unique, and we strive to tailor our services to meet your specific
          needs.
        </p>
        <SetupCompanyForm data={data} params={params} t={company} />
      </Card>
    </div>
  )
}

export default Page
