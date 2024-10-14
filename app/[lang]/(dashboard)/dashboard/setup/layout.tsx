import { MenuListLinks } from '@/components/menu-list-links'
import { DashboardConfig } from '@/config/dashboard'
import { OnboardingConfig } from '@/config/on-boarding'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { NavItem } from '@/types'
import React from 'react'

interface LayoutProps {
  params: { lang: Locale }
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params
}: LayoutProps) => {
  const {
    pages: {
      setup: { nav }
    }
  } = await getDictionary(params.lang)

  const pages: NavItem[] = [
    {
      title: 'Company',
      href: '/dashboard/setup'
    },
    {
      title: 'CEO',
      href: '/dashboard/setup/ceo-info',
      translationKey: 'ceo'
    },
    {
      title: 'Units',
      href: '/dashboard/setup/units'
    },
    {
      title: 'Skills',
      href: '/dashboard/setup/soft-skills'
    },
    {
      title: 'You',
      href: '/dashboard/setup/you'
    }
  ]

  return (
    <div className=" container flex flex-col gap-1 pt-5">
      <MenuListLinks items={pages} params={params} t={nav} />
      {children}
    </div>
  )
}

export default Layout
