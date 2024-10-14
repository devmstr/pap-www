import { Card } from '@/components/card'
import { Button } from '@/components/ui/button'
import { Card as CardBox } from '@/components/ui/card'
import { PaymentMethods } from './payment-methods'
import { PaymentCardForm } from './payment-card-form'
import { Locale } from '@/i18n.config'
import { AddPaymentDialog } from './add-payment.dialog'
import { InvoicesHistoryTable } from './invoices-history-table'
import { redirect } from 'next/navigation'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = ({ params }: PageProps) => {
  // only for testing
  return (
    <Card>
      <h1 className="text-xl font-black font-inter">Billing</h1>
      <p className="text-muted-foreground text-base">
        Update your billing details here.
      </p>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-5 mt-8">
        <CardBox className="flex w-full h-fit flex-col gap-4 p-8 ">
          <div className="flex justify-between items-center">
            <span className="text-3xl font-extrabold">Plus</span>
            <Button
              variant={'outline'}
              className="border-primary text-primary hover:text-primary"
            >
              Update Plan
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <p className="w-full text-sm flex items-center">
              Unlimited employee
              <span className="hidden sm:flex ml-1 text-xs font-inter font-light text-muted-foreground">{`(${120} assigned)`}</span>
            </p>
            <div className="flex gap-1 w-fit">
              <span className="text-sm text-muted-foreground font-bold">
                {15000}
              </span>
              <span className="text-sm text-muted-foreground font-bold">
                {'Da'}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="w-full text-sm flex items-center">
              Performance management
              <span className="hidden sm:flex ml-1 text-xs font-inter font-light text-muted-foreground">{`(${30} assigned)`}</span>
            </p>
            <div className="flex gap-1 w-fit">
              <span className="text-sm text-muted-foreground font-bold">
                {20000}
              </span>
              <span className="text-sm text-muted-foreground font-bold">
                {'Da'}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="w-full text-sm flex items-center">
              {"IDP's management"}
              <span className="hidden sm:flex ml-1 text-xs font-inter font-light text-muted-foreground">{`(${13} assigned)`}</span>
            </p>
            <div className="flex gap-1 w-fit">
              <span className="text-sm text-muted-foreground font-bold">
                {20000}
              </span>
              <span className="text-sm text-muted-foreground font-bold">
                {'Da'}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="w-full text-sm flex items-center">
              {'360° (degree) assessment'}
              <span className="hidden sm:flex ml-1 text-xs font-inter font-light text-muted-foreground">{`(${120} assigned)`}</span>
            </p>
            <div className="flex gap-1 w-fit">
              <span className="text-sm text-muted-foreground font-bold">
                {40000}
              </span>
              <span className="text-sm text-muted-foreground font-bold">
                {'Da'}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="w-full text-sm flex items-center">
              {'Success Planing'}
              <span className="hidden sm:flex ml-1 text-xs font-inter font-light text-muted-foreground">{`(${3} assigned)`}</span>
            </p>
            <div className="flex gap-1 w-fit">
              <span className="text-sm text-muted-foreground font-bold">
                {30000}
              </span>
              <span className="text-sm text-muted-foreground font-bold">
                {'Da'}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="w-full text-sm flex items-center">
              {'Yearly company performance report'}
              <span className="hidden sm:flex ml-1 text-xs font-inter font-light text-muted-foreground">{`(${1} sended)`}</span>
            </p>
            <div className="flex gap-1 w-fit">
              <span className="text-sm text-muted-foreground font-bold">
                {80000}
              </span>
              <span className="text-sm text-muted-foreground font-bold">
                {'Da'}
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200/60 " />
          <div className="flex justify-between items-center mt-3">
            <p className="w-full text-base font-bold ">{'Total per year'}</p>
            <div className="flex gap-1 w-fit">
              <span className="text-sm text-muted-foreground font-bold">
                {2105000}
              </span>
              <span className="text-sm text-muted-foreground font-bold">
                {'Da'}
              </span>
            </div>
          </div>
        </CardBox>
        {/* payment methods component */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="mb-4">
              <h2 className="text-lg font-black font-inter">Payment methods</h2>
              <p className="text-sm  text-muted-foreground ">
                Chose your preferred payment method.
              </p>
            </div>
            <AddPaymentDialog t={{}} params={params} />
          </div>
          <PaymentMethods params={params} />
        </div>
      </div>
      <div className="h-[2px] w-full px-5 bg-muted/70 mt-8 mb-4 " />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-black font-inter">Billing history</h2>
        <p className="text-sm  text-muted-foreground ">
          Access all you previous invoices.
        </p>
      </div>
      <InvoicesHistoryTable
        data={[
          {
            id: 974322309,
            date: '2024-03-23T00:00:00.000Z',
            status: 'unpaid',
            via: 'dahabiya',
            amount: 440000,
            currency: 'Da'
          },
          {
            id: 974322309,
            date: '2023-03-23T00:00:00.000Z',
            status: 'paid',
            via: 'visa',
            amount: 3274,
            currency: '$'
          }
        ]}
        params={params}
      />
    </Card>
  )
}

export default Page
