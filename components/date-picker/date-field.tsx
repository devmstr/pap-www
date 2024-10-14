// date-picker/date-field.tsx
'use client'

import { DateSegment } from './date-segment'
import { createCalendar } from '@internationalized/date'
import { useRef } from 'react'
import { AriaDatePickerProps, DateValue, useDateField } from 'react-aria'
import { useDateFieldState } from 'react-stately'
import { cn } from '@/lib/utils'
import { Locale } from '@/i18n.config'

const locales = {
  en: 'en-GB',
  fr: 'fr-FR'
}

function DateField(
  props: AriaDatePickerProps<DateValue> & {
    locale: Locale
    confirmed?: boolean
    className?: string
  }
) {
  const ref = useRef<HTMLDivElement | null>(null)

  const state = useDateFieldState({
    ...props,
    locale: locales[props.locale],
    createCalendar
  })
  const { fieldProps } = useDateField(props, state, ref)

  // Ensure aria-labelledby is set correctly
  const ariaLabelledBy = props['aria-labelledby'] || 'date-field-label'

  return (
    <div
      {...fieldProps}
      ref={ref}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'inline-flex h-10 flex-1 items-center rounded-l-md border border-r-0 border-input bg-transparent py-2 px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props?.confirmed == false && 'border-orange-500 text-orange-400',
        props.isDisabled ? 'cursor-not-allowed opacity-50' : '',
        props.className
      )}
    >
      {/* Ensure the label is properly linked */}
      {!props['aria-labelledby'] && (
        <span id="date-field-label" className="sr-only">
          Date Field
        </span>
      )}
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
      {state.validationState === 'invalid' && (
        <span aria-hidden="true">🚫</span>
      )}
    </div>
  )
}

export { DateField }
