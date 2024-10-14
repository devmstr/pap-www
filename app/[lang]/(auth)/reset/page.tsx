import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ResetPasswordForm } from './reset-password.form'

interface PageProps {
  params: { lang: Locale }
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page: React.FC<PageProps> = async ({
  params: { lang },
  searchParams: { email, token }
}: PageProps) => {
  const {
    pages: { reset: t }
  } = await getDictionary(lang)

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
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
            {t['title']}
          </h1>
          <p className="text-sm text-muted-foreground">{t['sub-title']}</p>
        </div>
        <ResetPasswordForm
          token={token as string}
          email={email as string}
          lang={lang}
          t={t.form}
        />
      </div>
    </div>
  )
}

export default Page
