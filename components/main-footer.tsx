import * as React from 'react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import Link from 'next/link'
import { SubscribeEmailNotifications } from './subscribe-email-notifications'
import { SocialMediaLinks } from './social-media-links'
import { footerConfig } from '@/config/footer'
import { Dictionary } from '@/types'
import { LangSwitcher } from './lang-switcher'
import { Locale } from '@/i18n.config'

interface MainFooterProps {
  className?: string
  t: Dictionary
}

export const MainFooter: React.FC<MainFooterProps> = async ({
  className,
  t
}: MainFooterProps) => {
  return (
    <footer className={cn(className, 'bg-primary')}>
      <div className="container flex flex-col gap-4 py-2 ">
        <Link href="#" className="flex gap-1  h-16 items-center">
          <Icons.logo className="h-8 w-auto" fill="white" />
          <span className="font-montserrat font-black text-xl text-white -skew-x-12">
            Pap
          </span>
        </Link>
        <div className="flex flex-col md:flex-row  justify-around gap-8 ">
          <ul className="flex flex-col gap-1 text-white">
            <li className="uppercase  font-fredoka font-bold">
              {t['company']}
            </li>
            {footerConfig.companyNav.map((item, index) => (
              <li key={index}>
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex w-full rounded-md py-1 text-sm font-medium hover:underline',
                    item.disabled && 'cursor-not-allowed opacity-60'
                  )}
                >
                  {t[item.href.slice(1).replace('#', '')]}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-1 text-white">
            <li className="uppercase  font-fredoka font-bold">
              {t['resources']}
            </li>
            {footerConfig.resourcesNav.map((item, index) => (
              <li key={index}>
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex w-full rounded-md py-1 text-sm font-medium hover:underline',
                    item.disabled && 'cursor-not-allowed opacity-60'
                  )}
                >
                  {t[item.href.slice(1).replace('#', '')]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <div className="flex space-x-20 mb-2  text-white font-quicksand font-medium">
              <ul className="flex flex-col gap-1">
                <li className="uppercase  font-fredoka font-bold">
                  {t['legal']}
                </li>
                {footerConfig.legalNav.map((item, index) => (
                  <li key={index}>
                    <Link
                      key={index}
                      href={item.disabled ? '#' : item.href}
                      className={cn(
                        'flex w-full rounded-md py-1 text-sm font-medium hover:underline',
                        item.disabled && 'cursor-not-allowed opacity-60'
                      )}
                    >
                      {t[item.href.slice(1).replace('#', '')]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3   font-quicksand font-medium">
              <p className="text-md max-w-[26rem] text-white">
                {t['subscribe-to-our-newsletter']}
              </p>
              <SubscribeEmailNotifications />
            </div>
          </div>
        </div>
        {/* social media links */}
        <div className="flex gap-3 py-3  font-quicksand font-medium">
          <span className="text-white">{t['fellow-us-on'] + ' :'}</span>
          <SocialMediaLinks />
        </div>
        {/* Creative rights links */}
        <div className="flex flex-row items-start sm:items-center justify-between border-t border-white border-opacity-60">
          <p className="text-white text-sm text-center">
            © 2023 {siteConfig.shortName}. {t['all-rights-reserved']}
          </p>
          <div className="flex justify-end">
            <LangSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
