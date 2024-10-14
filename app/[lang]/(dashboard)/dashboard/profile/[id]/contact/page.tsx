import { Card } from '@/components/card'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { ContactSchema } from '@/lib/validations/profile'
import React from 'react'
import { ContactForm } from './profile-contact.form'

import useServerApi from '@/hooks/use-server-side-axios-auth'
import { z } from 'zod'
import { delay } from '@/lib/utils'
import { ContactReadOnlyForm } from './contact-readonly.form'

interface PageProps {
  params: { lang: Locale; id: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const {
    pages: {
      profile: {
        pages: { contact: t }
      }
    }
  } = await getDictionary(params.lang)

  const fetchData = async () => {
    try {
      const api = await useServerApi()
      const { data: contact } = await api.get<z.infer<typeof ContactSchema>>(
        '/contact/' + params.id
      )

      return contact
    } catch (error) {}
  }

  const data = await fetchData()

  return (
    <Card>
      <ContactForm params={params} t={t.form} data={data} />
    </Card>
  )
}

export default Page
