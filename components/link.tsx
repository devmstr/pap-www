import { default as NextLink, LinkProps as Props } from 'next/link'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Locale } from '@/i18n.config'

export interface LinkProps extends Props {
  children?: React.ReactNode
  locale: Locale
  className?: string
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, href, locale, ...props }, ref) => {
    const url = `/${locale}${href}`

    return (
      <NextLink
        ref={ref}
        locale={locale}
        className={cn(className)}
        {...props}
        href={url}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'

export { Link }
