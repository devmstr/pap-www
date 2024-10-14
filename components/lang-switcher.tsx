'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { i18n, Locale } from '@/i18n.config'
import { cn, toCapitalize } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import { Icons } from './icons'
import { Button, buttonVariants } from './ui/button'

export const LangSwitcher: React.FC = ({}) => {
  const pathName = usePathname()

  const router = useRouter()
  const pathname = usePathname()

  function changeLanguage(lang: Locale): void {
    try {
      const redirectPath = `/${lang?.toLowerCase()}/${pathname
        .split('/')
        .splice(2)
        .join('/')}`
      fetch(
        `/api/set-lang?locale=${lang?.toLowerCase()}&redirect=${encodeURIComponent(
          redirectPath
        )}`,
        {
          method: 'GET'
        }
      )
      window.location.href = redirectPath
    } catch (error) {
      console.error(error)
    }
  }

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-8 w-8 px-0',
            'focus-visible:ring-0',
            'focus-visible:ring-offset-0',
            'hover:bg-primary'
          )}
        >
          <Icons.languages className=" text-white" />
          <Icons.dropdown className=" text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white space-y-1 rounded-md "
        align="end"
      >
        {i18n.locales.map((locale) => {
          return (
            <DropdownMenuItem
              className="hover:bg-accent rounded-md "
              key={locale}
            >
              <Link
                href={redirectedPathName(locale)}
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                    className: 'hover:text-primary'
                  }),
                  'font-quicksand'
                )}
                onClick={() => changeLanguage(locale)}
              >
                {toCapitalize(locale)}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
