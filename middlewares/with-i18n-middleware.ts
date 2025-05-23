import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

import { i18n, Locale } from '@/i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { CustomMiddleware } from './chain'
import { cookies } from 'next/headers'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

// export function middleware(request: NextRequest) {}

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // do i18n stuff
    const pathname = request.nextUrl.pathname

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const localeFromCookie = cookies().get('next-lang')?.value
      const locale =
        localeFromCookie || getLocale(request) || i18n.defaultLocale

      // Save the locale to a cookie
      const redirectUrl = new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )

      return NextResponse.redirect(redirectUrl)
    }

    return middleware(request, event, response)
  }
}
