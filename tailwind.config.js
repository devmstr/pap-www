const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      },
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '0 3px 6px rgba(0, 0, 0, 0.7)'
      },
      colors: {
        'gradient-gray': '#e7eeef',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        backgroundImage: {
          'hero-pattern': "url('public/images/header-background.jpg')"
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      fontFamily: {
        fredoka: ['var(--font-fredoka)', ...fontFamily.sans],
        quicksand: ['var(--font-quicksand)', ...fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
        inter: ['var(--font-inter)', ...fontFamily.sans]
      },
      fontSize: {
        xxs: '0.65rem'
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    },
    variants: {
      extend: {
        width: ['responsive', 'hover', 'focus']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        },
        '.text-shadow-lg': {
          textShadow: '0 3px 6px rgba(0, 0, 0, 0.7)'
        }
      })
    }
  ]
}
