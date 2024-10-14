import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Dictionary } from '@/types'

export const PricingPlanCard: React.FC<{
  t: Dictionary
  title: string
  priceYearly: number
  priceMonthly: number
}> = ({ title, priceYearly, priceMonthly, t }) => {
  return (
    <div className={cn('flex flex-col h-96 bg-white')}>
      <div
        className={
          'flex flex-col items-center gap-3 md:px-6 lg:px-10 xl:px-12 py-6 '
        }
      >
        <h2 className="text-2xl mb-8 text-nowrap">{title}</h2>
        <div className="flex items-end">
          <h1 className="text-5xl">${priceYearly}</h1>
          <span className="text-2xl text-muted-foreground/40">/mo</span>
        </div>
        <p className="text-blue-950 text-sm">{t['billed-yearly']}</p>
        <p className="text-blue-950 text-sm">
          {t['or']} ${priceMonthly} {t['billed-monthly']}
        </p>
        <Button className="mt-6 h-11 text-md px-2">{t['by-now']}</Button>
      </div>
    </div>
  )
}
