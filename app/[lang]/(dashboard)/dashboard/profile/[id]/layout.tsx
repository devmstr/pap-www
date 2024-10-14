import { MenuListLinks } from '@/components/menu-list-links'
import { DashboardConfig } from '@/config/dashboard'
import { AUTH_ROLES } from '@/config/globals'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'
import { cn, filterLinks } from '@/lib/utils'
import { NavItem } from '@/types'
import { getServerSession } from 'next-auth'
import React from 'react'

interface LayoutProps {
  params: { lang: Locale; id: string }
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params
}: LayoutProps) => {
  const session = await getServerSession(authOptions)
  const authRole = session?.user.role ?? 'ANYTHING'
  const api = await useServerApi()

  const { data: user } = await api.get<{ id: string; role: string }>(
    `/auth/${params.id}`
  )

  const {
    pages: {
      profile: { nav }
    }
  } = await getDictionary(params.lang)

  let upMenuLinks: NavItem[] = [
    {
      title: 'Personal',
      href: '/dashboard/profile/' + params.id
    },
    {
      title: 'Job',
      href: `/dashboard/profile/${params.id}/job`
    },
    {
      title: 'Contact',
      href: `/dashboard/profile/${params.id}/contact`
    },
    {
      title: 'Qualifications',
      href: `/dashboard/profile/${params.id}/qualifications`
    },
    {
      title: 'Performance',
      href: `/dashboard/profile/${params.id}/performance`
    },
    {
      title: 'IDPs',
      translationKey: 'idps',
      href: `/dashboard/profile/${params.id}/idps`
    },
    {
      title: 'Potential',
      href: `/dashboard/profile/${params.id}/potential`
    },
    {
      title: 'Competencies',
      href: `/dashboard/profile/${params.id}/competencies`
    },
    {
      title: 'Team',
      translationKey: 'team',
      href: `/dashboard/profile/${params.id}/team`
    },
    {
      title: 'Build Team',
      translationKey: 'buildTeam',
      href: `/dashboard/profile/${params.id}/build-team`
    }
  ]

  if (!['HR', 'CEO'].includes(authRole) && params.id != session?.user.sub)
    upMenuLinks = filterLinks(['Qualifications', 'Contact'], upMenuLinks)

  if (user.role == 'CEO' && !['HR', 'CEO'].includes(authRole))
    upMenuLinks = filterLinks(
      ['Potential', 'Performance', 'IDPs', 'Competencies', 'Team'],
      upMenuLinks
    )

  if (!['HR', 'CEO'].includes(authRole))
    upMenuLinks = filterLinks(['Build Team'], upMenuLinks)

  if (user.role == AUTH_ROLES.EMPLOYEE)
    upMenuLinks = filterLinks(['Team', 'Build Team'], upMenuLinks)

  return (
    <div className=" container flex flex-col gap-1 pt-5">
      <MenuListLinks items={upMenuLinks} params={params} t={nav} />
      {children}
    </div>
  )
}

export default Layout
