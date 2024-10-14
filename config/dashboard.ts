import { NavItem, SidebarNavItem } from '@/types'

export const DashboardConfig: {
  sidebar: SidebarNavItem[]
} = {
  sidebar: [
    {
      title: 'Dashboard',
      translationKey: 'dashboard',
      href: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Profile',
      href: '/dashboard/profile/[id]',
      translationKey: 'profile',
      icon: 'user'
    },
    {
      title: 'Qualifications',
      href: '/dashboard/qualifications',
      translationKey: 'qualifications',
      icon: 'certificate'
    },
    {
      title: 'Competencies',
      href: '/dashboard/competencies',
      translationKey: 'competencies',
      icon: 'competencies'
    },
    {
      title: 'Employees',
      href: '/dashboard/employees',
      translationKey: 'employees',
      icon: 'people'
    },
    {
      title: 'Potential',
      href: '/dashboard/potential',
      translationKey: 'potential',
      icon: 'potential'
    },
    {
      title: 'Performance',
      href: '/dashboard/performance',
      translationKey: 'performance',
      icon: 'goal'
    },
    {
      title: 'IDPs',
      href: '/dashboard/idps',
      translationKey: 'idps',
      icon: 'idp'
    },
    {
      title: 'Succession',
      href: '/dashboard/succession',
      translationKey: 'succession',
      icon: 'succession'
    }
  ]
}
