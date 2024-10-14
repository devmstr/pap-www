import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'
import { Locale, i18n } from '@/i18n.config'
import { CustomMiddleware } from './chain'

const protectedPaths = ['/dashboard']

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths]

  protectedPaths.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`
        ])
    )
  })

  return protectedPathsWithLocale
}

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next()

    const token = await getToken({ req: request })

    // @ts-ignore
    request.nextauth = request.nextauth || {}
    // @ts-ignore
    request.nextauth.token = token

    let pathname = request.nextUrl.pathname
    if (request.nextUrl.search) {
      pathname += request.nextUrl.search
    }

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales
    ])

    if (
      !token &&
      protectedPathsWithLocale.some((value) => pathname.includes(value))
    ) {
      // Determine the user's preferred locale
      const acceptedLocales = ['en', 'fr']

      const rawLocale = request.headers
        .get('accept-language')
        ?.split(',')[0]
        ?.toLowerCase()
      const preferredLocale = acceptedLocales.includes(
        rawLocale?.split('-')[0] || i18n.defaultLocale
      )
        ? rawLocale
        : i18n.defaultLocale

      // Redirect to the login page with the correct locale
      const redirectUrl = new URL(
        `/login?from=${encodeURIComponent(pathname)}`,
        request.url
      )
      redirectUrl.searchParams.append(
        'locale',
        preferredLocale || i18n.defaultLocale
      )
      return NextResponse.redirect(redirectUrl)
    }

    return middleware(request, event, response)
  }
}
