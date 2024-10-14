import { MenuListLinks } from '@/components/menu-list-links'
import { DashboardConfig } from '@/config/dashboard'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import React from 'react'

interface LayoutProps {
  params: { lang: Locale; id: string }
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params
}: LayoutProps) => {
  return <div className="">{children}</div>
}

export default Layout
