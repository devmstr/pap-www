'use client'

import { signOut, useSession } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'
import { toCapitalize, cn, delay } from '@/lib/utils'
import { Dictionary, SidebarNavItem } from '@/types'
import { Link } from './link'
import { Locale } from '@/i18n.config'
import { Icons } from './icons'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import { promise } from 'zod'
import React, { useState } from 'react'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[]
  t: Dictionary
  params: { lang: Locale }
}

export const UserAccountNav: React.FC<UserAccountNavProps> = ({
  items,
  t,
  params: { lang }
}: UserAccountNavProps) => {
  const segment = useSelectedLayoutSegment()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: session } = useSession()

  if (!session) return null
  const user = session.user
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center">
        <UserAvatar
          onLoad={() => setIsLoading(true)}
          user={user}
          className={cn(
            ' transaction-opacity duration-500  ',
            isLoading ? 'opacity-100' : 'opacity-0'
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-3 pt-2 pb-5" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.displayName && (
              <p className="font-medium">{toCapitalize(user.displayName)}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        {items.length &&
          items.map((item, index) => {
            const Icon = Icons[item.icon || 'arrowRight']
            const active = segment === item.href?.split('/').slice(2).join('')
            return (
              <DropdownMenuItem key={index} asChild>
                <div
                  className={cn(
                    'flex gap-3 font-medium fill-current group ',
                    active
                      ? 'text-primary opacity-100'
                      : 'text-gray-500 hover:opacity-100'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 group-hover:text-gray-800 text-opacity-85',
                      item.icon == 'certificate' && 'w-[1.3rem] h-auto'
                    )}
                  />
                  <Link
                    locale={lang}
                    href={
                      item.disabled
                        ? '#'
                        : item.href?.replace('[id]', session?.user.sub) || ''
                    }
                    className={cn(
                      'group-hover:text-gray-800 text-sm md:text-base lg:text-md  '
                    )}
                  >
                    {t[item.title.toLowerCase()]}
                  </Link>
                </div>
              </DropdownMenuItem>
            )
          })}
        <DropdownMenuItem
          className="cursor-pointer group"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`
            })
          }}
        >
          <div className="flex gap-1 text-base font-medium items-center !text-gray-500 group ">
            <Icons.logout className="w-5 h-5 mr-2 group-hover:text-gray-800 " />
            <span className=" group-hover:text-gray-800">{t['logout']}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
