import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { Icons } from './icons'
import React from 'react'

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {
  params: { lang: Locale }
}

export const DashboardNav = ({ params: { lang } }: DashboardNavProps) => {
  return (
    <div className=" ">
      <Link href="#" className="flex gap-1  h-16 items-center">
        <Icons.logo className="h-8 w-auto" fill="white" />
        <span className="font-montserrat font-black text-xl text-white -skew-x-12">
          Pap
        </span>
      </Link>
    </div>
  )
}
