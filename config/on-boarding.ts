import { NavItem, SidebarNavItem } from '@/types'
import { Department } from '@/types'

export const OnboardingConfig: {
  pages: Record<string, NavItem[]>
} = {
  pages: {
    setup: [
      {
        title: 'Company',
        href: '/dashboard/setup'
      },
      {
        title: 'Units',
        href: '/dashboard/setup/units'
      },
      {
        title: 'You',
        href: '/dashboard/setup/you'
      }
    ]
  }
}

export const ONBOARDING_DEPARTMENTS: Department[] = [
  {
    id: 'human-resources',
    label: 'Human Resources'
  },
  {
    id: 'finance',
    label: 'Finance'
  },
  {
    id: 'sales',
    label: 'Sales'
  },
  {
    id: 'customer-service',
    label: 'Customer Service'
  },
  {
    id: 'operations',
    label: 'Operations'
  },
  {
    id: 'it',
    label: 'IT'
  },
  {
    id: 'research-and-development',
    label: 'Research and Development (R&D) '
  },
  {
    id: 'design',
    label: 'Design'
  },
  {
    id: 'marketing',
    label: 'Marketing'
  }
]
