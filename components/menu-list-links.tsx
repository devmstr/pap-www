'use client'
import { Dictionary, NavItem } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import React, { useEffect } from 'react'
import { useWindowSize } from '@/hooks/use-window-size'
import { Skeleton } from './ui/skeleton'

interface MenuListLinksProps {
  items: NavItem[]
  params: { lang: Locale }
  t: Dictionary
}

export const MenuListLinks: React.FC<MenuListLinksProps> = ({
  items,
  params: { lang },
  t
}: MenuListLinksProps) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const pathname = usePathname()
  const { width } = useWindowSize()
  useEffect(() => {
    if (typeof window != 'undefined') setIsLoading(false)
  }, [])

  if (isLoading)
    return (
      <div className="w-full py-5 mb-2 ">
        <Skeleton className="bg-gray-200/45 h-[17px] w-full" />
      </div>
    )

  return (
    <div className={`relative w-full `}>
      <div className="absolute sm:hidden z-10 bg-gradient-to-l from-gray-100 from-10% -right-1 top-[23px] h-5 w-12  " />
      <ScrollArea
        style={{ width: width < 768 ? 0.95 * width : 0.95 * (width - 64) }}
        className={`h-fit  `}
      >
        <div className="w-full space-x-4 md:space-x-5 py-5 ">
          {items.map((item, index) => {
            const active = pathname === `/${lang}${item.href}`
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'text-sm md:text-base lg:text-md font-medium text-muted-foreground hover:text-primary transition-colors duration-200 flex-nowrap text-nowrap',
                  active
                    ? 'text-primary opacity-100'
                    : 'opacity-70 hover:opacity-100'
                )}
              >
                {t[item.translationKey || item.title.toLowerCase()]}
              </Link>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="h-0" />
      </ScrollArea>
    </div>
  )
}
