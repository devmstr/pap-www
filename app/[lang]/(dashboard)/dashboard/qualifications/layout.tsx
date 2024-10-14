import { MenuListLinks } from '@/components/menu-list-links'
import { DashboardConfig } from '@/config/dashboard'
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
      qualifications: { nav }
    }
  } = await getDictionary(params.lang)

  return <div className=" container py-5">{children}</div>
}

export default Layout
