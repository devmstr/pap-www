import * as React from 'react'
import Link from 'next/link'
import { Dictionary, MainNavItem } from '@/types'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { useLockBody } from '@/hooks/use-lock-body'
import { Icons } from '@/components/icons'

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
  t: Dictionary
}

export const MobileNav: React.FC<MobileNavProps> = ({
  items,
  children,
  t
}: MobileNavProps) => {
  useLockBody()
  return (
    <div
      className={cn(
        'fixed inset-0 min-w-[16rem] max-w-[80%] h-[80vh] top-[5rem] z-50 grid grid-flow-row  overflow-auto  shadow-md animate-in slide-in-from-left md:hidden duration-300 ease-out'
      )}
    >
      <div className="bg-popover h-full shadow-md rounded-br-md">
        <div className="relative p-4 h-fit ">
          <Link href="/" className="pl-2 flex gap-1  h-16 items-center">
            <Icons.logo className="h-8 w-auto" fill="#2ecefc" />
            <span className="font-montserrat font-black text-xl text-[#2ecefc] -skew-x-12">
              Pap
            </span>
          </Link>
          <nav className="grid grid-flow-row auto-rows-max text-sm">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? '#' : item.href}
                className={cn(
                  'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline hover:text-primary transition-colors',
                  item.disabled && 'cursor-not-allowed opacity-60'
                )}
              >
                {t[item.translationKey || '']}
              </Link>
            ))}
          </nav>
          {children}
        </div>
      </div>
    </div>
  )
}
