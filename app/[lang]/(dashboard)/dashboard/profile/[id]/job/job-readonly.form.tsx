'use client'

import { CardGrid } from '@/components/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Locale } from '@/i18n.config'
import { JobSchemaType } from '@/lib/validations/profile'
import { Dictionary } from '@/types'
import { format } from 'date-fns'
import React from 'react'

export const dynamic = 'force-dynamic'

interface JobReadOnlyFormProps {
  t: Dictionary
  data: JobSchemaType
  params: { lang: Locale; id: string }
}

export const JobReadOnlyForm: React.FC<JobReadOnlyFormProps> = ({
  data,
  t,
  params: { lang, id }
}: JobReadOnlyFormProps) => {
  return (
    <div className="w-full space-y-4">
      <CardGrid>
        <div>
          <Label>{t['job-title']}</Label>

          <Input
            type="text"
            className="disable-input"
            disabled
            placeholder="Job Title..."
            value={data?.title || ''}
          />
        </div>
        <div>
          <Label>{t['job-type']}</Label>

          <Input
            type="text"
            className="disable-input"
            disabled
            placeholder="Job Type..."
            value={data?.type || ''}
          />
        </div>
        {data?.Department && (
          <div>
            <Label>{t['department']}</Label>
            <Input
              type="text"
              className="disable-input"
              disabled
              placeholder="Department..."
              value={data?.Department?.name || ''}
            />
          </div>
        )}
        <div>
          <Label>{t['hiring-date']}</Label>
          <Input
            value={
              data?.employedAt
                ? format(new Date(data?.employedAt), 'dd/MM/yyyy')
                : format(new Date(), 'dd/MM/yyyy')
            }
            className="disable-input"
            disabled
          />
        </div>
        <div>
          <Label>{t['employee-number']}</Label>
          <Input
            type="text"
            className="disable-input"
            disabled
            placeholder="Employee Number..."
            value={data?.employeeNumber || ''}
          />
        </div>
      </CardGrid>
      <CardGrid>
        <div className="md:col-span-3">
          <Label>{t['description']}</Label>
          <Textarea
            className="disable-input  h-36 xl:h-24"
            disabled
            placeholder="Description..."
            value={data?.description || ''}
          />
        </div>
      </CardGrid>
    </div>
  )
}
