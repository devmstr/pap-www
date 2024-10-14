'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { Dictionary, MainNavItem } from '@/types'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Icons } from './icons'
import { MobileNav } from './mobile-nav'
import { Button } from './ui/button'
import { BurgerMenu } from './nav-icon'

interface MainNavProps {
  t?: Dictionary
  items?: MainNavItem[]
  children?: React.ReactNode
}

export const MainNav: React.FC<MainNavProps> = ({
  items,
  t,
  children
}: MainNavProps) => {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden md:flex gap-1  h-16 items-center">
        <Icons.logo className="h-8 w-auto" />
        <span className="font-montserrat font-black text-xl text-[#2ecefc] -skew-x-12"></span>
        Pap
      </Link>
      {items?.length && t ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {t[item.translationKey || '']}
            </Link>
          ))}
        </nav>
      ) : null}

      <Button
        onClick={(e) => {
          e.preventDefault
          setShowMobileMenu(!showMobileMenu)
        }}
        className={cn(
          'block md:hidden w-full pl-[0.7rem] h-10 hover:bg-primary/90 justify-center items-center rounded-md'
        )}
      >
        <BurgerMenu className="w-4 h-4" state={showMobileMenu} />
      </Button>

      {showMobileMenu && items && t && (
        <MobileNav items={items} t={t}>
          {children}
        </MobileNav>
      )}
    </div>
  )
}
