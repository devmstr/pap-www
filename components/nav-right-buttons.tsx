'use client'

import { cn } from '@/lib/utils'
import { Dictionary } from '@/types'
import { useSession } from 'next-auth/react'
import { Link } from '@/components/link'
import { buttonVariants } from './ui/button'
import React from 'react'
import { Locale } from '@/i18n.config'

interface NavRightButtonsProps {
  params: { lang: Locale }
  t: Dictionary
}

export const NavRightButtons: React.FC<NavRightButtonsProps> = ({
  params: { lang },
  t
}: NavRightButtonsProps) => {
  const { data: session } = useSession()
  if (session) {
    return (
      <Link
        locale={lang}
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'px-4'
        )}
      >
        {t['dashboard-button']}
      </Link>
    )
  }
  return (
    <>
      <Link
        locale={lang}
        href="/login"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'px-4'
        )}
      >
        {t['login-button']}
      </Link>
      <Link
        locale={lang}
        href="/register"
        className={cn(
          buttonVariants({ variant: 'default', size: 'sm' }),
          'px-4'
        )}
      >
        {t['try-it-free-button']}
      </Link>
    </>
  )
}
