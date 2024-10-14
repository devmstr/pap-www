import { MenuListLinks } from '@/components/menu-list-links'
import { DashboardConfig } from '@/config/dashboard'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { NavItem } from '@/types'
import { headers } from 'next/headers'
import React from 'react'

interface LayoutProps {
  params: { lang: Locale }
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params
}: LayoutProps) => {
  return <div className=" container flex flex-col gap-1 pt-5">{children}</div>
}

export default Layout
