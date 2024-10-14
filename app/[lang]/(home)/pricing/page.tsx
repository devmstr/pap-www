import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import { PricingPlans } from './pricing-plans'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
const Page: React.FC<{ params: { lang: Locale } }> = async ({ params }) => {
  const {
    pages: { pricing: t }
  } = await getDictionary(params.lang)
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-20 overflow-x-hidden">
      <div className="container text-center flex flex-col gap-10 py-10 items-center justify-center">
        <div className="text-center flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="font-fredoka text-primary text-5xl mb-4">
              {t['title']}
            </h1>
            <h2 className="font-fredoka text-gray-400 text-xl font-light">
              {t['sub-title']}
            </h2>
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="text-blue-950 max-w-64 ">
              <div className="bg-gray-100 px-2 sm:px-3 md:px-4 py-7 h-96">
                <h1 className="text-start text-wrap text-[1.3rem] sm:text-[1.8rem] md:text-[2.15rem] font-normal font-quicksand ">
                  {t['chose-your-plan']}
                </h1>
              </div>
            </div>
            <PricingPlans t={t} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 text-center font-fredoka max-w-3xl mx-auto">
          <p className="text-gray-400">{t['sub-paragraph']}</p>

          <Link
            className={cn(buttonVariants({ variant: 'default' }), 'w-fit px-4')}
            href="/contact"
          >
            {t['contact-us']}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
