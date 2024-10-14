// pages/api/set-lang.ts
import { Locale } from '@/i18n.config'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const locale = searchParams.get('locale') as Locale
  const redirectUrl = new URL(searchParams.get('redirect') || '/', req.nextUrl)

  if (locale) {
    cookies().set('next-lang', locale, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
      maxAge: 86400 * 365
    })
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.json({ success: false, message: 'Invalid language' })
}
