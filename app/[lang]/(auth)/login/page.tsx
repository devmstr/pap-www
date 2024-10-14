import { Metadata } from 'next'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { UserLoginForm } from '@/components/user-login-form'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n.config'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

export default async function LoginPage({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const {
    pages: { login: t }
  } = await getDictionary(lang)
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        locale={lang}
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {t['back']}
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-8 w-auto " />
          <h1 className="text-2xl font-semibold tracking-tight">
            {t['welcome']}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t['enter-your-email']}
          </p>
        </div>
        <UserLoginForm t={t} />
        <p className="flex flex-col gap-1 px-8 items-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand hover:underline underline-offset-4"
          >
            {t['dont-have-an-account']}
          </Link>
          <Link
            href="/reset-password"
            className="hover:text-brand hover:underline underline-offset-4"
          >
            {t['no-just-forget-i-my-password']}
          </Link>
        </p>
      </div>
    </div>
  )
}
