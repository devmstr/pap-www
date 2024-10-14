import { Card } from '@/components/card'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { JobSchema } from '@/lib/validations/profile'
import React from 'react'
import { JobForm } from './profile-job-form'

import useServerApi from '@/hooks/use-server-side-axios-auth'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import Loading from '../loading'
import { JobReadOnlyForm } from './job-readonly.form'

interface PageProps {
  params: { lang: Locale; id: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions)
  const role = session?.user.role || 'ANYTHING'
  const {
    pages: {
      profile: {
        pages: { job: t }
      }
    }
  } = await getDictionary(params.lang)

  const fetchData = async () => {
    try {
      const api = await useServerApi()
      const { data: position } = await api.get<z.infer<typeof JobSchema>>(
        `position/${params.id}`
      )
      const {
        data: { data: departments }
      } = await api.get<{
        data: { id: string; name: string }[]
      }>('department', {
        params: { per_page: '999' }
      })
      return { position, departments }
    } catch (error) {
      console.error(error)
    }
  }

  const data = await fetchData()
  if (!data) return <Loading />

  return (
    <Card>
      {params.id != session?.user.sub && !['HR', 'CEO'].includes(role) ? (
        <JobReadOnlyForm t={t.form} params={params} data={data.position} />
      ) : (
        <JobForm
          isRestricted={!['HR', 'CEO'].includes(role)}
          departments={data.departments}
          t={t.form}
          params={params}
          data={data.position}
        />
      )}
    </Card>
  )
}

export default Page
