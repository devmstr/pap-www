'use client'
import { CardFooter } from '@/components/card'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { Dictionary } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface PaymentCardFormProps {
  params: { lang: Locale }
  t: Dictionary
}

const CardPaymentSchema = z.object({
  card_number: z.string().regex(/^(?:\d{4}[ -]?){3}\d{4}|\d{16}$/),
  expiry_date: z.string().regex(/^(0[1-9]|1[0-2])\/(2[2-9]|[3-9][0-9])$/),
  cvv: z.string().regex(/^\d{3,4}$/),
  cardholder_name: z.string(),
  keepMyPaymentDetails: z.boolean().optional(),
  selectedMethod: z.string().optional()
})

type CardPaymentSchemaType = z.infer<typeof CardPaymentSchema>

export const PaymentCardForm: React.FC<PaymentCardFormProps> = ({
  params: { lang },
  t
}: PaymentCardFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const cardPaymentForm = useForm<CardPaymentSchemaType>({
    resolver: zodResolver(CardPaymentSchema)
  })
  const [isKeepMyPaymentDetails, setIsKeepMyPaymentDetails] =
    useState<boolean>(true)

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('visa')

  const router = useRouter()

  async function onSubmit(formData: CardPaymentSchemaType) {
    try {
      setIsLoading(true)
      router.refresh()
      console.log({
        ...formData,
        keepMyPaymentDetails: isKeepMyPaymentDetails,
        selectedMethod: selectedPaymentMethod
      })
    } catch (error: any) {
      toast({
        title: error.response.data.error,
        description: <p>{error.response.data.message}</p>,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value
      .replace(/\s+/g, '') // Remove whitespace
      .replace(/[^0-9]/gi, '') // Remove non-numeric characters
      .replace(/(.{4})/g, '$1 ') // Add space after every 4 characters

    // Remove space from the end if it's not a multiple of 4
    if (formattedValue.length % 5 === 0) {
      formattedValue = formattedValue.trim()
    }

    // Limit to 15 characters (including hyphens)
    formattedValue = formattedValue.slice(0, 19)

    cardPaymentForm.setValue('card_number', formattedValue)
  }

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value
    // Remove non-numeric characters
    input = input.replace(/\D/g, '')
    // Ensure only 3 digits are allowed
    input = input.slice(0, 3)
    // Update state with the sanitized input
    cardPaymentForm.setValue('cvv', input)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value
      .replace(/\s+/g, '') // Remove whitespace
      .replace(/[^0-9]/gi, '') // Remove non-numeric characters
      .slice(0, 4) // Limit to 4 characters (MMYY)

    // Add slash after the second character (month)
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + '/' + formattedValue.slice(2)
    }

    cardPaymentForm.setValue('expiry_date', formattedValue)
  }
  return (
    <Form {...cardPaymentForm}>
      <form
        onSubmit={cardPaymentForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex h-[3.2rem] gap-4">
          <div
            onClick={() => setSelectedPaymentMethod('visa')}
            className={cn(
              'relative flex items-center justify-center border rounded-sm p-2 cursor-pointer',
              selectedPaymentMethod == 'visa'
                ? 'border-2 border-primary bg-primary/10'
                : 'border'
            )}
          >
            <Icons.visa className="w-10 h-fit" />
            {selectedPaymentMethod == 'visa' && (
              <Icons.checkCircle className="absolute bg-white -top-2 -right-2 w-4 h-auto text-primary" />
            )}
          </div>
          <div
            onClick={() => setSelectedPaymentMethod('mastercard')}
            className={cn(
              'relative flex items-center justify-center border rounded-sm p-2 cursor-pointer',
              selectedPaymentMethod == 'mastercard'
                ? 'border-2 border-primary bg-primary/10'
                : 'border'
            )}
          >
            <Icons.mastercard className="w-10 h-fit" />
            {selectedPaymentMethod == 'mastercard' && (
              <Icons.checkCircle className="absolute bg-white -top-2 -right-2 w-4 h-auto text-primary" />
            )}
          </div>
          <div
            onClick={() => setSelectedPaymentMethod('dahabiya')}
            className={cn(
              'relative flex items-center justify-center border rounded-sm p-2 cursor-pointer',
              selectedPaymentMethod == 'dahabiya'
                ? 'border-2 border-primary bg-primary/10'
                : 'border'
            )}
          >
            <Icons.dahabiya className="w-10 h-8" />
            {selectedPaymentMethod == 'dahabiya' && (
              <Icons.checkCircle className="absolute bg-white -top-2 -right-2 w-4 h-auto text-primary" />
            )}
          </div>
          <div
            onClick={() => setSelectedPaymentMethod('cib')}
            className={cn(
              'relative flex items-center justify-center border rounded-sm p-2 cursor-pointer',
              selectedPaymentMethod == 'cib'
                ? 'border-2 border-primary bg-primary/10'
                : 'border'
            )}
          >
            <Icons.cartecib className="w-10 h-8" />
            {selectedPaymentMethod == 'cib' && (
              <Icons.checkCircle className="absolute bg-white -top-2 -right-2 w-4 h-auto text-primary" />
            )}
          </div>
        </div>
        <FormField
          control={cardPaymentForm.control}
          name="cardholder_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Cardholder Name..."
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <FormField
              control={cardPaymentForm.control}
              name="card_number"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="whitespace-nowrap">
                    Card Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=""
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      onChange={handleInputChange}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 ">
            <FormField
              control={cardPaymentForm.control}
              name="expiry_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-28"
                      type="text"
                      placeholder="10/26"
                      onChange={handleExpiryChange}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={cardPaymentForm.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={handleCvvChange}
                      className="w-14"
                      type="text"
                      placeholder="886"
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-start md:items-center gap-1.5 mt-8">
          <Icons.info className="mt-1 md:mt-0 min-w-[1.1rem] min-h-[1.1rem] text-primary" />
          <p className="select-none text-sm text-muted-foreground/60">
            Credit card payment may take up to 24h to be processed.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Checkbox
            className="ml-[1px]"
            id="save-payment-details"
            checked={isKeepMyPaymentDetails}
            onCheckedChange={(checked) =>
              typeof checked == 'boolean'
                ? setIsKeepMyPaymentDetails(checked)
                : setIsKeepMyPaymentDetails(false)
            }
          />
          <p className="select-none text-sm text-muted-foreground/60">
            Save my payment details for future purchases.
          </p>
        </div>
        <CardFooter>
          <Button className="w-full" variant={'default'}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              t?.submit ?? 'Add Card'
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
