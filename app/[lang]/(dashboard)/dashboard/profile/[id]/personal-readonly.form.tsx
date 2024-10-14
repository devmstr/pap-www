'use client'
import { CardGrid } from '@/components/card'
import { Input } from '@/components/ui/input'
import { PersonalSchema } from '@/lib/validations/profile'
import { Dictionary } from '@/types'
import React from 'react'
import { z } from 'zod'

import { DatePicker } from '@/components/date-picker'

import { Locale } from '@/i18n.config'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'

type FormData = z.infer<typeof PersonalSchema>

interface PersonalReadOnlyFormProps {
  t?: Dictionary
  data?: FormData
  params: { lang: Locale; id: string }
}

export const PersonalReadOnlyForm: React.FC<PersonalReadOnlyFormProps> = ({
  t,
  data,
  params: { lang, id }
}: PersonalReadOnlyFormProps) => {
  return (
    <div className="space-y-4">
      <CardGrid>
        <div>
          <Label>{t['first-name']}</Label>

          <Input
            type="text"
            className="disable-input"
            disabled
            placeholder="First Name..."
            value={data?.firstName || ''}
          />
        </div>
        <div>
          <Label>{t['last-name']}</Label>

          <Input
            type="text"
            className="disable-input"
            disabled
            placeholder="Last Name..."
            value={data?.lastName || ''}
          />
        </div>
        <div>
          <Label>{t['middle-name']}</Label>

          <Input
            type="text"
            className="disable-input"
            disabled
            placeholder="Middle Name..."
            value={data?.middleName || ''}
          />
        </div>
        <div>
          <Label>{t['gender']}</Label>

          <Input className="disable-input" disabled value={data?.gender} />
        </div>
        <div>
          <Label>{t['marital-status']}</Label>
          <Input
            className="disable-input"
            disabled
            value={data?.marital || 'Single'}
          />
        </div>
        <div>
          <Label id="dob-date-picker">{t['date-of-birth']}</Label>
          <Input
            value={
              data?.dob
                ? format(new Date(data?.dob), 'dd/MM/yyyy')
                : format(new Date(), 'dd/MM/yyyy')
            }
            className="disable-input"
            disabled
          />
        </div>
      </CardGrid>
    </div>
  )
}
