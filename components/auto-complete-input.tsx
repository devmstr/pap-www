'use client'

import React, { Dispatch } from 'react'
import { AutoCompleteItem } from '@/types'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { cn } from '@/lib/utils'

interface AutoCompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  items: AutoCompleteItem[]
  setValue: (value: string) => void
  value: string
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  items,
  setValue,
  value,
  ...props
}: AutoCompleteProps) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(items)

  const onSelect = (item: AutoCompleteItem) => {
    setValue(item.value)
    setOpen(false)
  }

  useEffect(() => {
    setData(items)
  }, [items])

  useEffect(() => {
    if (!value) return
    const valueWords = value
      .toLowerCase()
      .split(' ')
      .filter((word) => word.length > 0)
    setData(
      items.filter((item) =>
        item.value
          .toLowerCase()
          .split(' ')
          .some((titleWord) =>
            valueWords.some((valueWord) => titleWord.includes(valueWord))
          )
      )
    )
  }, [value])

  return (
    <div className={cn('relative', props.className)}>
      <Input
        className="capitalize"
        value={value}
        onFocus={() => setOpen(false)}
        onChange={(e) => {
          setValue(e.target.value)
          setOpen(e.target.value.length > 0)
        }}
        {...props}
      />
      <div
        className={cn(
          'absolute w-full z-50 bg-background border mt-3 rounded-md',
          open && data.length > 0 ? 'flex' : 'hidden'
        )}
      >
        <ScrollArea className={cn('w-full max-h-48 overflow-y-auto ')}>
          <div className="p-1">
            {data.length > 0 &&
              data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="cursor-pointer text-sm py-[0.45rem] px-4 rounded-sm text-foreground hover:text-primary hover:bg-slate-100  transition-colors ease-in-out duration-300"
                >
                  {item.value}
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
