import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn, toCapitalize } from '@/lib/utils'

interface MartialStatusSelectorProms
  extends React.HTMLAttributes<HTMLDivElement> {
  topic?: string
  value?: string
  setValue: (value: string) => void
  items: string[]
  confirmed?: boolean
  disabled?: boolean
  removeChoiceIf?: boolean
}

export function Selector({
  setValue,
  topic,
  value,
  items,
  className,
  confirmed = true,
  disabled = false
}: MartialStatusSelectorProms) {
  return (
    <Select
      onValueChange={(value) => {
        setValue(value)
      }}
      value={value}
    >
      <SelectTrigger
        className={cn(
          'w-full',
          className,
          !confirmed ? 'border-orange-400 text-orange-400' : 'border'
        )}
        disabled={disabled}
      >
        <SelectValue
          placeholder={
            value || topic ? `Select a ${topic}` : 'Select an option'
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, index) => {
            return (
              <SelectItem
                disabled={item.includes('$')}
                className="capitalize"
                key={index}
                value={item.replace('$', '')}
              >
                {toCapitalize(item.replace('$', ''))}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
