'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Dictionary } from '@/types'
import { useEffect, useRef } from 'react'
import { ScrollArea } from './ui/scroll-area'
import Link from 'next/link'
import { Icons } from './icons'

interface SearchComboBoxProps extends React.HTMLAttributes<React.ReactNode> {
  value?: string
  setValue: (value: string) => void
  items: {
    value: string
  }[]
  topic?: string
  confirmed?: boolean
  disabled?: boolean
}

export function SearchComboBox({
  value,
  setValue,
  items,
  topic,
  confirmed = true,
  disabled = false,
  className
}: SearchComboBoxProps) {
  const [triggerWidth, setTriggerWidth] = React.useState(0)
  const [open, setOpen] = React.useState(false)

  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (open && triggerRef.current) {
      const width = triggerRef.current.getBoundingClientRect().width
      setTriggerWidth(width)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={triggerRef} asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'justify-between font-normal px-3',
            disabled && 'hover:cursor-not-allowed select-none',
            !confirmed && 'border-orange-400 text-orange-500',
            className
          )}
        >
          {value
            ? items.find((item) => item.value === value)?.value ||
              items[0]?.value
            : topic
            ? `Select ${topic} ...`
            : 'Select Topic...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: triggerWidth }}>
        <Command>
          <CommandInput
            placeholder={topic ? `Search ${topic} ...` : 'Search topic...'}
          />
          <CommandEmpty>
            {topic ? `No ${topic} found.` : 'No Topic found.'}
          </CommandEmpty>
          <CommandGroup className="">
            <ScrollArea className="h-72 w-full">
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : item.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 ',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.value}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
