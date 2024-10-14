'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { PricingPlanCard } from './pricing-plan-card'
import { cn } from '@/lib/utils'
import { HtmlHTMLAttributes } from 'react'
import { Icons } from '@/components/icons'
import { Locale } from '@/i18n.config'
import { Dictionary } from '@/types'

interface PricingPlansProps {
  t: Dictionary
}

export const PricingPlans: React.FC<PricingPlansProps> = ({
  t
}: PricingPlansProps) => {
  const pricingPlans = [
    { title: t['small-plan'], priceYearly: 123, priceMonthly: 234 },
    {
      title: t['medium-plan'],
      priceYearly: 123,
      isPopular: true,
      priceMonthly: 234
    },
    { title: t['premium-plan'], priceYearly: 123, priceMonthly: 234 }
  ]
  return (
    <Carousel
      className="pl-1 max-w-60 md:max-w-fit
    "
    >
      <CarouselContent className="items-center">
        {pricingPlans.map((plan, index) => (
          <CarouselItem
            key={index}
            className={cn(
              'max-w-60 md:max-w-fit md:basis-1/3 pl-0 ',
              plan.isPopular ? 'z-30 scale-105' : 'z-20'
            )}
          >
            <div className={cn('relative', plan.isPopular && 'shadow-xl')}>
              {plan.isPopular && (
                <div className="relative flex justify-center mb-3">
                  <h3 className="absolute top-4 text-primary text-[0.6rem] tracking-[0.55em] z-40 ">
                    {t['most-popular']}
                  </h3>
                  <div className="absolute top-[9px] h-[5px] w-full bg-primary"></div>
                </div>
              )}
              <PricingPlanCard
                t={t}
                title={plan.title}
                priceYearly={plan.priceYearly}
                priceMonthly={plan.priceMonthly}
              />
              {plan.title != 'Premium Plan' ? (
                <div className="flex absolute w-full md:hidden justify-center bottom-9">
                  <Icons.doubleChevronsRight className="w-6 h-6 text-muted-foreground/20 animate-pulse " />
                </div>
              ) : null}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
