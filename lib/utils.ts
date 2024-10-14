import { NavItem, SidebarNavItem } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { ISODateString } from 'next-auth'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export function YearAndMonthFrom(isoDateString: ISODateString): {
  year: number
  month: number
} {
  let currentDate = new Date()
  const inputDate = new Date(isoDateString)

  let year = currentDate.getFullYear() - inputDate.getFullYear()
  let month = currentDate.getMonth() - inputDate.getMonth()

  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < inputDate.getDate())
  ) {
    year--
    month += 12
  }

  return { year, month }
}

export function toKebabCase(str: string): string {
  if (!str) return str
  return str
    .trim()
    .replace(/[\s\.\-]+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export function toCapitalize(str: string): string {
  if (!str) return str
  return str
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const filterLinks = <T extends { title: string }>(
  exclude: string[],
  links: T[]
) => links.filter((item) => !exclude.includes(item.title))

// to screaming snake case
export function toScreamingSnakeCase(str: string): string {
  if (!str) return str
  return str
    .trim()
    .replace(/\.|\-/g, '_')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toUpperCase()
}

export function formatDateTime(isoDateString: string) {
  /* input is '2024-01-25T18:00:00.000Z'  */
  const inputDate = new Date(isoDateString)
  const currentDate = new Date()

  const inputDateLastNight = new Date(isoDateString).setUTCHours(0, 0, 0, 0)
  const currentDateLastNight = new Date().setUTCHours(0, 0, 0, 0)

  const difference =
    (currentDateLastNight - inputDateLastNight) / (1000 * 60 * 60 * 24)

  if (difference === 0) {
    // If the input date is today, return time in HH:MM format
    //  get difference in hours and minutes
    const differenceInMinutes =
      (currentDate.getTime() - inputDate.getTime()) / 1000 / 60
    const hours = Math.floor(differenceInMinutes / 60)
    const minutes = Math.floor(differenceInMinutes % 60)

    return `${hours > 0 ? hours + ' hours' : ''} ${
      minutes > 0 ? minutes + ' minutes' : '1 minute'
    } ago `
  } else if (difference === 1) {
    // If the input date was yesterday, return 'Yesterday'
    return 'Updated Yesterday'
  } else {
    // If the input date was more than 1 day ago, return date in MM/DD/YYYY format
    const month = inputDate.getUTCMonth() + 1 // JavaScript counts months from 0 to 11
    const day = inputDate.getUTCDate()
    const year = inputDate.getUTCFullYear()
    return `Updated ${month < 10 ? '0' + month : month}/${
      day < 10 ? '0' + day : day
    }/${year}`
  }
}

export function getLastAndNextFiveYears(): string[] {
  const currentYear = new Date().getFullYear()
  const lastFiveYears = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i - 1).toString()
  )
  const nextFiveYears = Array.from({ length: 5 }, (_, i) =>
    (currentYear + i + 1).toString()
  )

  return [...nextFiveYears.reverse(), currentYear.toString(), ...lastFiveYears]
}
