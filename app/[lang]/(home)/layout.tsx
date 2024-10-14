import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { MainNav } from '@/components/main-nav'
import { homeConfig } from '@/config/home'
import { siteConfig } from '@/config/site'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n.config'
import { getServerSession } from 'next-auth'
import { NavRightButtons } from '@/components/nav-right-buttons'
import { MainFooter } from '@/components/main-footer'

interface HomeLayoutProps {
  children: React.ReactNode
  params: { lang: Locale }
}

export default async function HomeLayout({
  children,
  params
}: HomeLayoutProps) {
  const { mainNavbar, mainFooter } = await getDictionary(params.lang)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav t={mainNavbar} items={homeConfig.nav} />
          <nav>
            <div className="flex items-center gap-2">
              <NavRightButtons params={params} t={mainNavbar} />
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full">{children}</main>
      <MainFooter t={mainFooter} />
    </div>
  )
}
