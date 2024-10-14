'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  Form
} from './ui/form'
import { CardGrid } from './card'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { Dictionary } from '@/types'

interface ContactUsFormProps extends React.HTMLAttributes<HTMLDivElement> {
  t: Dictionary
}

type FormData = {
  firstName: string
  lastName: string
  subject: string
  email: string
  message: string
}

const contactUsSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
})

export const ContactUsForm: React.FC<ContactUsFormProps> = ({
  t,
  className,
  ...props
}: ContactUsFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(contactUsSchema)
  })

  const onSubmit = (formData: FormData) => {
    // Handle form submission logic here
  }

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-muted-foreground">
                    {t['first-name']}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Type your first name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-muted-foreground">
                    {t['last-name']}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Type your last name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-muted-foreground">
                    {' '}
                    {t['email']}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Type your email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-muted-foreground">
                    {t['subject']}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Type your subject..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className=" md:col-span-2">
                  <FormLabel className="text-muted-foreground ">
                    {t['message']}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message..."
                      {...field}
                      className="resize-none h-20 w-full  p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button className="mt-6 w-full sm:w-fit " type="submit">
              {t['submit']}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
