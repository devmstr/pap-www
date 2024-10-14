import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import React from 'react'
import { EmployeeLayoutMenuButtons } from './employee-layout-menu-buttons'

interface LayoutProps {
  params: { slug: string; lang: Locale }
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params
}: LayoutProps) => {
  const {
    pages: { employees: t }
  } = await getDictionary(params.lang)

  return (
    <div className=" container flex flex-col">
      <EmployeeLayoutMenuButtons t={t} />
      {children}
    </div>
  )
}

export default Layout
