'use client'

import { Dictionary, SidebarNavItem } from '@/types'

import React from 'react'
import { Icons } from './icons'
import { Locale } from '@/i18n.config'
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Fade from './Fade'
import { BurgerMenu } from './nav-icon'
import { Button } from './ui/button'

interface DashboardSidebarProps {
  t: Dictionary
  items: SidebarNavItem[]
  params: { lang: Locale }
  hide: boolean
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  items,
  t,
  params: { lang },
  hide = false
}: DashboardSidebarProps) => {
  const segment = useSelectedLayoutSegment()
  const active = segment ? segment : 'dashboard'
  const [showSidebar, setShowSidebar] = React.useState(false)
  return (
    <aside className="absolute  md:relative left-0 flex flex-col h-full items-center bg-background ">
      <div className={cn('flex-col h-screen z-50', hide ? 'hidden' : 'flex')}>
        <Button
          onClick={() => setShowSidebar(!showSidebar)}
          className={cn(
            'bg-primary h-[67px] w-full flex  justify-center items-center border-r-2 border-white border-opacity-15  rounded-none'
          )}
        >
          <BurgerMenu state={showSidebar} />
        </Button>
        <div
          onClick={(e) => {
            e.preventDefault()
            if (showSidebar) setShowSidebar(!showSidebar)
          }}
          className={cn(
            'relative flex -left-16 md:left-0 flex-col justify-center items-start h-full drop-shadow-lg bg-white  ',
            showSidebar
              ? 'w-[14rem] left-0  transition-all duration-300 ease-in'
              : 'w-16  transition-all duration-500 ease-out'
          )}
        >
          <nav className={cn('w-full flex flex-col gap-[0.6rem] px-[0.8rem]')}>
            {items.map((item, index) => {
              const Icon = Icons[item.icon || 'arrowRight']
              const delay = index * 80 + 100
              const glow = active == item.title.toLowerCase()
              const url = item.disabled ? '#' : item.href ?? ''
              return (
                <Link
                  key={index}
                  href={url}
                  className={cn(
                    'flex items-center  text-gray-500 font-medium fill-current w-full ',
                    glow
                      ? 'text-primary'
                      : 'hover:text-gray-800 hover:text-opacity-90',
                    item.disabled && 'cursor-not-allowed opacity-30'
                  )}
                >
                  <div
                    className={cn(
                      'relative w-full p-2 hover:bg-gray-100 hover:bg-opacity-65 flex gap-3 rounded-md group items-center'
                    )}
                  >
                    <Icon
                      className={cn(
                        'flex items-center justify-center h-[1.3rem] w-[1.3rem]',
                        item.icon == 'certificate' && 'h-auto w-[1.4rem]'
                      )}
                    />
                    {showSidebar && (
                      <Fade
                        className={cn(
                          'absolute flex text-md sm:text-sm left-10'
                        )}
                        from={'right'}
                        amount={0.4}
                        duration={250}
                        delay={delay}
                        easing={'easeInOut'}
                      >
                        <span className="text-nowrap whitespace-nowrap">
                          {t[item.translationKey || '']}
                        </span>
                      </Fade>
                    )}
                    <div
                      className={cn(
                        'absolute left-[3.7rem] scale-0 group-hover:scale-100 justify-center items-center  transition-all duration-300 delay-150',
                        showSidebar ? 'hidden ' : 'flex '
                      )}
                    >
                      {/* <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white -mr-[0.15rem]" /> */}
                      <div className="bg-white rounded-md flex justify-center items-center p-2 ">
                        <span className="px-1 text-sm text-nowrap whitespace-nowrap">
                          {t[item.translationKey || item.title]}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
