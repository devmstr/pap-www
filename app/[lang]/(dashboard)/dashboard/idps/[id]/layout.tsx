import { Locale } from '@/i18n.config'
import React from 'react'

interface LayoutProps {
  params: { lang: Locale }
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params
}: LayoutProps) => {
  return <div className="">{children}</div>
}

export default Layout
