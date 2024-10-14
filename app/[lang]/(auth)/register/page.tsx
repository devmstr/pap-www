import { Link } from '@/components/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { UserSingUpForm } from '@/components/user-sign-up-form'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.'
}

interface Props {
  params: { lang: Locale }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function RegisterPage({
  params: { lang },
  searchParams
}: Props) {
  const {
    pages: { signUp: t }
  } = await getDictionary(lang)
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        locale={lang}
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        {t['login']}
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-8 w-auto" />
            <h1 className="text-2xl font-semibold tracking-tight">
              {t['create-an-account']}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t['enter-your-email']}
            </p>
          </div>
          <UserSingUpForm searchParams={searchParams} t={t} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t['by-clicking-continue'] + ' '}
            <Link
              locale={lang}
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              {t['our-terms']}
            </Link>{' '}
            {t['and'] + ' '}
            <Link
              locale={lang}
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              {t['privacy-policy']}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
