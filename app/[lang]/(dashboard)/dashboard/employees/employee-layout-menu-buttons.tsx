'use client'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { Dictionary } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface EmployeeLayoutMenuButtonsProps {
  t: Dictionary
}

export const EmployeeLayoutMenuButtons: React.FC<
  EmployeeLayoutMenuButtonsProps
> = ({ t }: EmployeeLayoutMenuButtonsProps) => {
  const pathname = usePathname()

  return (
    <div className="flex gap-4 justify-end text-gray-500/60 pt-8 pb-5 px-2">
      <div className="flex gap-3 group cursor-pointer  ">
        <span className="text-sm font-medium group-hover:text-primary">
          {t['import']}
        </span>
        <Icons.csvFile className="w-5 h-5 hover:text-primary" />
      </div>
      <span className="text-sm font-medium ">|</span>
      <div className="flex gap-3 group cursor-pointer  ">
        <span className="text-sm font-medium group-hover:text-primary">
          {t['export']}
        </span>
        <Icons.csvFile className="w-5 h-5 hover:text-primary" />
        <Icons.pdfFile className="w-5 h-5 hover:text-primary" />
      </div>
      <span className="text-sm font-medium ">|</span>
      <Link
        href="/dashboard/employees"
        className={cn(
          'flex gap-2 hover:text-primary cursor-pointer ',
          pathname?.split('/').pop() === 'employees' && 'text-primary'
        )}
      >
        <Icons.list className="w-5 h-5" />
        <span className={'text-sm font-medium'}>{t['list']}</span>
      </Link>
      <Link
        href={'/dashboard/employees/grid'}
        className={cn(
          'hidden md:flex gap-2 hover:text-primary cursor-pointer ',
          pathname?.split('/').pop() === 'grid' && 'text-primary'
        )}
      >
        <Icons.grid className="w-5 h-5" />
        <span className="text-sm font-medium ">{t['grid']}</span>
      </Link>
      <Link
        href="/dashboard/employees/org-chart"
        className={cn(
          'hidden md:flex gap-2 hover:text-primary cursor-pointer ',
          pathname?.split('/').pop() === 'org-chart' && 'text-primary'
        )}
      >
        <Icons.orgChart className="w-5 h-5" />
        <span className="text-sm font-medium ">{t['orgChart']}</span>
      </Link>
    </div>
  )
}
