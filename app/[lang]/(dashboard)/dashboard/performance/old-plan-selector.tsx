'use client'
import { Selector } from '@/components/selector'
import { Label } from '@/components/ui/label'
import { getLastAndNextFiveYears } from '@/lib/utils'
import { useMemo } from 'react'

interface OldPlanSelectorProps {
  year?: string
  setYear: (year: string) => void
}

export const OldPlanSelector: React.FC<OldPlanSelectorProps> = ({
  year,
  setYear
}: OldPlanSelectorProps) => {
  const LAST_AND_NEXT_FIVE_YEARS = useMemo(getLastAndNextFiveYears, [])

  return (
    <div className="flex gap-3 items-center">
      <Label className="font-normal font-inter text-muted-foreground">
        Plan
      </Label>
      <div className="w-[7.1rem]">
        <Selector
          value={year}
          setValue={(value) => setYear(value)}
          items={LAST_AND_NEXT_FIVE_YEARS}
        />
      </div>
    </div>
  )
}
