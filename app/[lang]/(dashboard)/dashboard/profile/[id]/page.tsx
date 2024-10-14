import { Card } from '@/components/card'
import { Loading } from '@/components/loading'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'
import { SetupCompanySchema } from '@/lib/validations/company-setup'
import { PersonalSchema } from '@/lib/validations/profile'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import React from 'react'
import { z } from 'zod'
import { PersonalReadOnlyForm } from './personal-readonly.form'
import { PersonalProfileForm } from './personal.form'
import { ProfileSummery } from './profile-summery-card'

interface PageProps {
  params: { lang: Locale; id: string }
}

const ProfilePage: React.FC<PageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions)
  const api = await useServerApi()
  const role = session?.user.role || 'ANYTHING'
  if (!session) redirect('/login')
  const {
    pages: {
      profile: {
        pages: { personal: t }
      }
    }
  } = await getDictionary(params.lang)

  const fetchData = async () => {
    try {
      const { data } = await api.get<{
        Personal: z.infer<typeof PersonalSchema>
        Company: z.infer<typeof SetupCompanySchema>
        Position: {
          title: string
          employedAt: string
        }
        User: {
          email: string
          image: string
          role: string
        }
        Boss?: {
          id: string
          displayName: string
        }
      }>('/profile/' + params.id)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const data = await fetchData()
  if (!data) return <Loading />

  return (
    <div className="flex flex-col xl:flex-row  w-full font-quicksand gap-6">
      <Card className="flex flex-col w-full h-full xl:w-96 gap-3 ">
        <ProfileSummery
          className=""
          data={{
            email: data.User.email,
            firstName: data.Personal.firstName,
            lastName: data.Personal.lastName,
            employedAt: data.Position.employedAt,
            image: data.User.image,
            position: data.Position.title,
            company: data.Company?.name,
            Boss: data.Boss
          }}
          t={t}
        />
      </Card>

      <Card className="h-fit">
        {params.id != session?.user.sub && !['HR', 'CEO'].includes(role) ? (
          <PersonalReadOnlyForm
            params={params}
            data={data.Personal}
            t={t.form}
          />
        ) : (
          <PersonalProfileForm
            params={params}
            data={data.Personal}
            t={t.form}
          />
        )}
      </Card>
    </div>
  )
}

export default ProfilePage
