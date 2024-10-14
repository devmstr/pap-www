'use client'
import { Locale } from '@/i18n.config'
import { useState, useEffect, useMemo } from 'react'

interface DateTimeBlockProps {
  params: { lang: Locale }
}

export const DateTimeBlock: React.FC<DateTimeBlockProps> = ({
  params: { lang }
}: DateTimeBlockProps) => {
  const getDateTime = useMemo(() => {
    const date = new Date()
    const options = {
      weekday: 'long' as const,
      day: 'numeric' as const,
      month: 'short' as const,
      year: 'numeric' as const
    }
    return {
      dayOfWeek: date.toLocaleString(lang, { weekday: options.weekday }),
      day: date.toLocaleString(lang, { day: options.day }),
      month: date.toLocaleString(lang, { month: options.month }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString(lang, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }
  }, [lang])

  const [dateTime, setDateTime] = useState(getDateTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getDateTime)
    }, 60000)

    return () => clearInterval(timer)
  }, [getDateTime])

  useEffect(() => {
    setDateTime(getDateTime)
  }, [])

  return (
    <div className="flex flex-row gap-1 items-end text-primary">
      <span className="text-lg font-medium capitalize">
        {dateTime.dayOfWeek},
      </span>
      <span className="text-2xl font-medium relative -bottom-[0.10rem]">
        {dateTime.day}
      </span>
      <span className="text-md font-normal">{dateTime.month}</span>
      <span className="text-md font-normal">{dateTime.year},</span>
      <span className="text-2xl font-medium relative -bottom-[0.10rem]">
        {dateTime.time}
      </span>
    </div>
  )
}
