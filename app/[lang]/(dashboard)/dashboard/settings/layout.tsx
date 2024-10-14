import { MenuListLinks } from '@/components/menu-list-links'
import { ROLES } from '@/config/globals'
import { Locale } from '@/i18n.config'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'
import { filterLinks } from '@/lib/utils'
import { NavItem } from '@/types'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  params: { lang: Locale }
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params
}: LayoutProps) => {
  const session = await getServerSession(authOptions)
  const {
    pages: {
      settings: { nav }
    }
  } = await getDictionary(params.lang)

  let upMenuLinks: NavItem[] = [
    {
      title: 'Account',
      href: '/dashboard/settings',
      translationKey: 'account'
    },
    {
      title: 'Security',
      href: '/dashboard/settings/security',
      translationKey: 'security'
    },
    {
      title: 'Company',
      href: '/dashboard/settings/company',
      translationKey: 'company'
    },
    {
      title: 'Customization',
      href: '/dashboard/settings/customization',
      translationKey: 'customization'
    },
    {
      title: 'Notifications',
      href: '/dashboard/settings/notifications',
      translationKey: 'notifications'
    },
    {
      title: 'Subscription',
      href: '/dashboard/settings/subscription',
      translationKey: 'subscription'
    }
  ]

  if (['EMPLOYEE', 'MANAGER', 'HRD'].includes(session?.user.role!))
    upMenuLinks = filterLinks(
      ['Company', 'Customization', 'Notifications'],
      upMenuLinks
    )
  if (['EMPLOYEE', 'MANAGER', 'HRD', 'HR'].includes(session?.user.role!))
    upMenuLinks = filterLinks(['Subscription'], upMenuLinks)

  return (
    <div className="container py-5">
      <MenuListLinks items={upMenuLinks} params={params} t={nav} />
      {children}
    </div>
  )
}

export default Layout
