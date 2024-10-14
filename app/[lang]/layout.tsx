import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'

import { Analytics } from '@/components/analytics'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { AuthProvider } from '@/components/auth-provider'
import { Locale, i18n } from '@/i18n.config'
import { ThemeProvider } from '@/components/theme-provider'

const fontInter = localFont({
  src: [
    {
      path: '../../assets/fonts/Inter-Light.ttf',
      weight: '100',
      style: 'light'
    },
    {
      path: '../../assets/fonts/Inter-Regular.ttf',
      weight: '300',
      style: 'regular'
    },
    {
      path: '../../assets/fonts/Inter-Medium.ttf',
      weight: '500',
      style: 'medium'
    },

    {
      path: '../../assets/fonts/Inter-SemiBold.ttf',
      weight: '700',
      style: 'semiBold'
    },
    {
      path: '../../assets/fonts/Inter-Bold.ttf',
      weight: '900',
      style: 'bold'
    }
  ],
  variable: '--font-inter'
})
const fontFredoka = localFont({
  src: [
    {
      path: '../../assets/fonts/Fredoka-Light.ttf',
      weight: '100',
      style: 'light'
    },
    {
      path: '../../assets/fonts/Fredoka-Regular.ttf',
      weight: '300',
      style: 'regular'
    },
    {
      path: '../../assets/fonts/Fredoka-Medium.ttf',
      weight: '500',
      style: 'medium'
    },

    {
      path: '../../assets/fonts/Fredoka-SemiBold.ttf',
      weight: '700',
      style: 'semiBold'
    },
    {
      path: '../../assets/fonts/Fredoka-Bold.ttf',
      weight: '900',
      style: 'bold'
    }
  ],
  variable: '--font-fredoka'
})

const fontQuicksand = localFont({
  src: [
    {
      path: '../../assets/fonts/Quicksand-Light.ttf',
      weight: '100',
      style: 'light'
    },
    {
      path: '../../assets/fonts/Quicksand-Regular.ttf',
      weight: '300',
      style: 'regular'
    },
    {
      path: '../../assets/fonts/Quicksand-Medium.ttf',
      weight: '500',
      style: 'medium'
    },

    {
      path: '../../assets/fonts/Quicksand-SemiBold.ttf',
      weight: '700',
      style: 'semiBold'
    },
    {
      path: '../../assets/fonts/Quicksand-Bold.ttf',
      weight: '900',
      style: 'bold'
    }
  ],
  variable: '--font-quicksand'
})

const fontMontserrat = localFont({
  src: [
    {
      path: '../../assets/fonts/Montserrat-Light.ttf',
      weight: '100',
      style: 'light'
    },
    {
      path: '../../assets/fonts/Montserrat-Regular.ttf',
      weight: '300',
      style: 'regular'
    },
    {
      path: '../../assets/fonts/Montserrat-Medium.ttf',
      weight: '500',
      style: 'medium'
    },

    {
      path: '../../assets/fonts/Montserrat-SemiBold.ttf',
      weight: '700',
      style: 'semiBold'
    },
    {
      path: '../../assets/fonts/Montserrat-Bold.ttf',
      weight: '900',
      style: 'bold'
    }
  ],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`
  },
  description: siteConfig.description,
  authors: siteConfig.authors,
  icons: {
    icon: '/favicon.ico',
    // shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
  // manifest: `${siteConfig.url}/site.webmanifest`
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { lang: Locale }
}

export default async function RootLayout({
  children,
  params: { lang }
}: RootLayoutProps) {
  return (
    <html lang={lang}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontFredoka.variable,
          fontQuicksand.variable,
          fontMontserrat.variable,
          fontInter.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            defaultTheme="light"
            forcedTheme="light"
            enableSystem={false}
            enableColorScheme={false}
          >
            {children}
            <Analytics />
            <Toaster />
            {/* <TailwindIndicator /> */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
