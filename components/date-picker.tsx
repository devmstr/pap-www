// date-picker.tsx
'use client'

import React, { useEffect, useRef, useState, forwardRef } from 'react'
import {
  DateValue,
  useButton,
  useDatePicker,
  useInteractOutside
} from 'react-aria'
import { DatePickerStateOptions, useDatePickerState } from 'react-stately'
import { useForwardedRef } from '@/lib/useForwardedRef'
import { cn } from '@/lib/utils'

import { CalendarDate } from '@internationalized/date'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@radix-ui/react-popover'
import { Button } from './ui/button'

import { Locale } from '@/i18n.config'

import { CalendarIcon } from 'lucide-react'
import { DateField } from './date-picker/date-field'
import { TimeField } from './date-picker/time-field'
import dynamic from 'next/dynamic'
const HeavyCalendar = dynamic(
  () => import('./date-picker/calendar').then((mod) => mod.Calendar),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
)

type DatePickerProps = DatePickerStateOptions<DateValue> & {
  locale: Locale
  id?: string
  /** Sets the time portion of the value. */
  date: Date
  onDateChange: (date: Date) => void
  confirmed?: boolean
  className?: string
  'aria-labelledby'?: string
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (props, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)

    const [open, setOpen] = useState(false)

    const state = useDatePickerState(props)

    useEffect(() => {
      if (!state.dateValue) {
        const defaultDate = new CalendarDate(
          props.date.getFullYear(),
          props.date.getMonth() + 1,
          props.date.getDate()
        )
        state.setDateValue(defaultDate)
      }
    }, [])

    useEffect(() => {
      if (state.dateValue) {
        const date = new Date(
          Date.UTC(
            state.dateValue.year,
            state.dateValue.month - 1,
            state.dateValue.day
          )
        )
        props.onDateChange(date)
      }
    }, [state.dateValue])

    const {
      groupProps,
      fieldProps,
      buttonProps: _buttonProps,
      dialogProps,
      calendarProps
    } = useDatePicker(props, state, ref)

    const { buttonProps } = useButton(_buttonProps, buttonRef)
    useInteractOutside({
      ref: contentRef,
      onInteractOutside: (e) => {
        setOpen(false)
      }
    })

    return (
      <div
        {...groupProps}
        id={props.id}
        ref={ref}
        className={cn(
          'flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
        )}
        aria-labelledby={props['aria-labelledby']}
      >
        <DateField
          locale={props.locale}
          confirmed={props.confirmed}
          className={props.className}
          aria-labelledby={props['aria-labelledby']}
          {...fieldProps}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              {...buttonProps}
              variant="outline"
              className={cn(
                'rounded-l-none',
                props?.confirmed === false &&
                  'border-orange-500 text-orange-400'
              )}
              disabled={props.isDisabled}
              onClick={() => setOpen(true)}
              aria-label="Open date picker"
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            ref={contentRef}
            className="w-full z-50 bg-popover p-5 rounded-md shadow-md"
          >
            <div {...dialogProps} className="space-y-3">
              <HeavyCalendar locale={props.locale} {...calendarProps} />
              {!!state.hasTime && (
                <TimeField
                  locale={props.locale}
                  value={state.timeValue}
                  onChange={(value) => {
                    state.setTimeValue(value)
                  }}
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export { DatePicker }
