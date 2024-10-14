'use client'

import { CardGrid } from '@/components/card'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ContactSchema } from '@/lib/validations/profile'
import { Dictionary } from '@/types'
import React from 'react'
import { z } from 'zod'
export const dynamic = 'force-dynamic'

type FormData = z.infer<typeof ContactSchema>

interface ContactReadOnlyFormProps {
  t: Dictionary
  data?: FormData
  params: { lang: string; id: string }
}

export const ContactReadOnlyForm: React.FC<ContactReadOnlyFormProps> = ({
  data,
  t,
  params: { lang, id }
}: ContactReadOnlyFormProps) => {
  return (
    <div className="space-y-6">
      <CardGrid>
        <div>
          <Label>Mobile</Label>
          <Input
            placeholder="01234 567890"
            className="w-full disable-input"
            disabled
            value={data?.mobile || ''}
          />
        </div>
        <div>
          <Label>Work</Label>

          <Input
            placeholder="01234 567890"
            className="w-full disable-input"
            disabled
            value={data?.work || ''}
          />
        </div>
        <div>
          <Label>Email</Label>

          <Input
            placeholder="Example@email.com..."
            className="w-full disable-input"
            disabled
            value={data?.email || ''}
          />
        </div>

        <div>
          <Label>Home</Label>

          <Input
            placeholder="01234 567890"
            className="w-full disable-input"
            disabled
            value={data?.home || ''}
          />
        </div>
      </CardGrid>
      <div className="my-6 ">
        <span className="text-2xl sm:text-3xl text-muted-foreground/15 font-inter select-none">
          Address
        </span>
      </div>
      <CardGrid>
        <div className="grid w-full items-center gap-1.5">
          <Label>Country</Label>

          <Input className="disable-input" disabled value={data?.country} />
        </div>
        <div>
          <Label>City</Label>

          <Input
            className="disable-input"
            disabled
            value={data?.city}
            id="city"
            placeholder={t.state}
          />
        </div>
        <div>
          <Label>Street 1</Label>

          <Input
            className="disable-input"
            disabled
            value={data?.street1}
            placeholder={t.state}
          />
        </div>
        <div>
          <Label>Street 2</Label>

          <Input
            className="disable-input"
            disabled
            value={data?.street2}
            placeholder={t.state}
          />
        </div>
        <div>
          <Label htmlFor="zip-code">Zip</Label>

          <Input
            className="disable-input"
            disabled
            id="zip-code"
            value={data?.zip}
            placeholder={t.zip}
          />
        </div>
      </CardGrid>
    </div>
  )
}
