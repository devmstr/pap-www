import { Card } from '@/components/card'
import { SecuritySettingForm } from './security-setting-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  // only for testing
  const {
    pages: {
      settings: {
        pages: { security: t }
      }
    }
  } = await getDictionary(params.lang)
  return (
    <Card className="flex flex-col">
      <h1 className="text-xl font-black font-inter">{t['title']}</h1>
      <p className="text-muted-foreground text-base">{t['sub-title']}</p>
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex flex-col gap-2 md:w-[25%]">
              <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
                {t['two-step-verification']}
              </span>
            </div>

            <div className="flex w-full md:w-[75%] gap-3  max-w-xl justify-between ">
              <p className="text-sm text-muted-foreground/70">
                {t['tow-step-verification-sub-paragraph']}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row mt-2">
            <div className="flex flex-col gap-2 md:w-[25%]">
              <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
                {t['text-message']}
              </span>
            </div>
            <div className="flex w-full md:w-[75%] gap-3  max-w-xl justify-between ">
              <p className="text-sm text-muted-foreground/70">
                {t['text-message-sub-paragraph']}
              </p>
              <Popover>
                <PopoverTrigger
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'border-primary text-primary hover:text-primary'
                  )}
                >
                  {t['setup']}
                </PopoverTrigger>
                <PopoverContent className="max-w-xs mt-2">
                  This functionality is currently in development. We will notify
                  you via email as soon as it is ready to use.
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row mt-2">
            <div className="flex flex-col gap-2 md:w-[25%]">
              <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
                {t['authenticator-app']}
              </span>
            </div>
            <div className="flex w-full md:w-[75%] gap-3  max-w-xl justify-between ">
              <p className="text-sm text-muted-foreground/70">
                {t['authenticator-app-sub-paragraph']}
              </p>
              <Popover>
                <PopoverTrigger
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'border-primary text-primary hover:text-primary'
                  )}
                >
                  {t['setup']}
                </PopoverTrigger>
                <PopoverContent className="max-w-xs mt-2">
                  This functionality is currently in development. We will notify
                  you via email as soon as it is ready to use.
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full px-5 bg-muted/70 " />
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex flex-col gap-2 md:w-[25%]">
            <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
              {t['devices']}
            </span>
          </div>

          <div className="flex w-full md:w-[75%] gap-3  max-w-xl justify-between ">
            <p className="text-sm text-muted-foreground/70">
              {t['devices-sub-paragraph']} <br />
              <Link className="flex mt-1 gap-1 text-xs text-primary" href={'#'}>
                {t['see-all']}
                <Icons.longArrowDown className="-rotate-90 text-primary w-3 h-auto" />
              </Link>
            </p>
            <Popover>
              <PopoverTrigger
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'border-primary text-primary hover:text-primary'
                )}
              >
                {t['logout']}
              </PopoverTrigger>
              <PopoverContent className="max-w-xs mt-2">
                This functionality is currently in development. We will notify
                you via email as soon as it is ready to use.
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="h-[2px] w-full px-5 bg-muted/70 " />
      </div>
      <SecuritySettingForm t={t.form} />
    </Card>
  )
}

export default Page
