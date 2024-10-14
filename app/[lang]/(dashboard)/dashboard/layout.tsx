import { DashboardNav } from '@/components/dashboard-nav'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserAccountNav } from '@/components/user-account-nav'

import { Locale } from '@/i18n.config'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Loading } from '@/components/loading'
import { SessionProvider } from 'next-auth/react'
import { DashboardConfig } from '@/config/dashboard'
import { SidebarNavItem } from '@/types'
import { AUTH_ROLES } from '@/config/globals'
import { filterLinks } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
  params: {
    lang: Locale
  }
}

export default async function DashboardLayout({
  children,
  params
}: LayoutProps) {
  const {
    avatar: { nav },
    pages: {
      dashboard: { nav: dashboard }
    }
  } = await getDictionary(params.lang)

  const session = await getServerSession(authOptions)

  if (!session) return <Loading />

  let avatarLinks: SidebarNavItem[] = [
    {
      title: 'Profile',
      href: `/dashboard/profile/${session.user.sub}`,
      translationKey: 'profile',
      icon: 'user'
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      translationKey: 'settings',
      icon: 'settings'
    }
  ]
  let sidebarLinks: SidebarNavItem[] = [
    {
      title: 'Dashboard',
      translationKey: 'dashboard',
      href: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Employees',
      href: '/dashboard/employees',
      translationKey: 'employees',
      icon: 'people'
    },
    {
      title: 'Qualifications',
      href: '/dashboard/qualifications',
      translationKey: 'qualifications',
      icon: 'certificate'
    },
    {
      title: 'Performance',
      href: '/dashboard/performance',
      translationKey: 'performance',
      icon: 'goal'
    },
    {
      title: 'IDPs',
      href: '/dashboard/idps',
      translationKey: 'idps',
      icon: 'idp'
    },
    {
      title: 'Succession',
      href: '/dashboard/succession',
      translationKey: 'succession',
      icon: 'succession'
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      translationKey: 'settings',
      icon: 'settings'
    }
  ]

  if (!['HR'].includes(session?.user.role))
    sidebarLinks = filterLinks(['Succession', 'Qualifications'], sidebarLinks)

  if (['EMPLOYEE'].includes(session?.user.role))
    sidebarLinks = filterLinks(['Employees'], sidebarLinks)

  if (['MANAGER', 'HRD'].includes(session?.user.role))
    sidebarLinks = sidebarLinks.map((link) => {
      if (link.href == '/dashboard/employees')
        return { ...link, title: 'Team', translationKey: 'team' }
      else return link
    })

  return (
    <div className="flex !max-h-screen h-screen w-full">
      <DashboardSidebar
        hide={!session.user.onBoarded}
        t={dashboard}
        params={params}
        items={sidebarLinks}
      />

      <main className="flex flex-col w-full h-full">
        <nav className="pl-16 xl:pl-0 h-16 z-40 w-full bg-primary">
          <div className="container h-full flex items-center justify-between">
            <DashboardNav params={params} />
            <div className="relative flex items-center justify-center  w-[44px] h-[44px] border-2 border-white rounded-full">
              <UserAccountNav
                params={params}
                items={avatarLinks}
                t={nav}
                className="absolute z-40"
              />
            </div>
          </div>
        </nav>
        <ScrollArea className="bg-gray-100 h-full  w-full">
          <div className="pb-16">{children}</div>
        </ScrollArea>
      </main>
    </div>
  )
}
