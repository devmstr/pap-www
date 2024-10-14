'use client'
import { Icons } from '@/components/icons'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card as CardBox } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AddPaymentDialog } from './add-payment.dialog'
import { Locale } from '@/i18n.config'

interface PaymentMethodsProps {
  params: { lang: Locale }
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  params
}: PaymentMethodsProps) => {
  const [radioGroupValue, setRadioGroupValue] = useState<string>('visa')
  return (
    <div className="">
      <RadioGroup
        defaultValue={radioGroupValue}
        onValueChange={setRadioGroupValue}
      >
        <CardBox
          className={cn(
            'w-full flex gap-4 p-4',
            radioGroupValue == 'visa' ? 'border-2 border-primary' : 'border'
          )}
        >
          <Icons.visa className="border rounded-sm p-2 w-12 h-fit" />
          <div className="flex w-full justify-between ">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>1234</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Expires 12/25
              </span>
              <div className="flex items-center space-x-2 mt-2 cursor-pointer">
                <RadioGroupItem value="visa" id="r1" />
                <Label
                  className={cn(
                    'text-sm font-normal text-muted-foreground cursor-pointer',
                    radioGroupValue == 'visa'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                  htmlFor="r1"
                >
                  {radioGroupValue == 'visa' ? 'Default' : 'Set as default'}
                </Label>
              </div>
            </div>
            <Button
              variant={'outline'}
              className="border-primary text-primary hover:text-primary"
            >
              Edit
            </Button>
          </div>
        </CardBox>
        <CardBox
          className={cn(
            'w-full flex gap-4 p-4',
            radioGroupValue == 'mastercard'
              ? 'border-2 border-primary'
              : 'border'
          )}
        >
          <Icons.mastercard className="border rounded-sm p-2 w-12 h-fit" />
          <div className="flex w-full justify-between ">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>1234</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Expires 12/25
              </span>
              <div className="flex items-center space-x-2 mt-2 cursor-pointer">
                <RadioGroupItem value="mastercard" id="r2" />
                <Label
                  className={cn(
                    'text-sm font-normal text-muted-foreground cursor-pointer',
                    radioGroupValue == 'mastercard'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                  htmlFor="r2"
                >
                  {radioGroupValue == 'mastercard'
                    ? 'Default'
                    : 'Set as default'}
                </Label>
              </div>
            </div>
            <Button
              variant={'outline'}
              className="border-primary text-primary hover:text-primary"
            >
              Edit
            </Button>
          </div>
        </CardBox>
        <CardBox
          className={cn(
            'w-full flex gap-4 p-4',
            radioGroupValue == 'dahabiya' ? 'border-2 border-primary' : 'border'
          )}
        >
          <Icons.dahabiya className="border rounded-sm p-2 w-12 h-fit" />
          <div className="flex w-full justify-between ">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>1234</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Expires 12/25
              </span>
              <div className="flex items-center space-x-2 mt-2 cursor-pointer">
                <RadioGroupItem value="dahabiya" id="r3" />
                <Label
                  className={cn(
                    'text-sm font-normal text-muted-foreground cursor-pointer',
                    radioGroupValue == 'dahabiya'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                  htmlFor="r3"
                >
                  {radioGroupValue == 'dahabiya' ? 'Default' : 'Set as default'}{' '}
                </Label>
              </div>
            </div>
            <Button
              variant={'outline'}
              className="border-primary text-primary hover:text-primary"
            >
              Edit
            </Button>
          </div>
        </CardBox>
        <CardBox
          className={cn(
            'w-full flex gap-4 p-4',
            radioGroupValue == 'cib' ? 'border-2 border-primary' : 'border'
          )}
        >
          <Icons.cartecib className="border rounded-sm p-2 w-12 h-fit" />
          <div className="flex w-full justify-between ">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>1234</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Expires 12/25
              </span>
              <div className="flex items-center space-x-2 mt-2 cursor-pointer">
                <RadioGroupItem value="cib" id="r4" />
                <Label
                  className={cn(
                    'text-sm font-normal text-muted-foreground cursor-pointer',
                    radioGroupValue == 'cib'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                  htmlFor="r4"
                >
                  {radioGroupValue == 'cib' ? 'Default' : 'Set as default'}{' '}
                </Label>
              </div>
            </div>
            <Button
              variant={'outline'}
              className="border-primary text-primary hover:text-primary"
            >
              Edit
            </Button>
          </div>
        </CardBox>
      </RadioGroup>
    </div>
  )
}
