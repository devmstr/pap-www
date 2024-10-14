import { Icons } from '@/components/icons'

type Department = {
  id: string
  label: string
}

type NavItem = {
  title: string
  href: string
  translationKey?: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type DashboardConfig = {
  sidebar: SidebarNavItem[]
}

export type HomeConfig = {
  nav: MainNavItem[]
}

export type FooterConfig = {
  companyNav: MainNavItem[]
  resourcesNav: MainNavItem[]
  legalNav: MainNavItem[]
}

export type StatsCardItem = {
  icon?: string
  title: string
  stats?: number
  updateAt?: string
  // last2stats: {
  //   value: string
  //   href: string
  // }[]
}

export type EmployeePasswordsEntry = {
  id: string
  displayName: string
  email: string
  password: string
  updatedAt: string
}
export type CompetencyEntry = {
  id: string
  name: string
  Sectors: { id: string; title: string }[]
  updatedAt: string
}
export type EmployeeEntry = {
  id: string
  image: string
  displayName: string
  role: string
  email: string
  Departments: {
    id: string
    name: string
  }[]
  Positions: {
    id: string
    title: string
  }[]
  Profile: {
    firstName: string
    lastName: string
  }
}

export type CompanyUnitEntity = {
  id?: string
  name: string
  updatedAt?: string
}

export type InvoiceEntity = {
  id: number
  via: string
  date: string
  status: string
  amount: number
  currency: string
}

export type SkillRating = {
  id: string
  rating: number
  plan: string
  isBossRating: boolean
  skillId: string
  authId: string
}
export type CompetencyRating = {
  id: string
  rating: number
  plan: string
  isBossRating: boolean
  competencyId: string
  authId: string
}

export type Competency = {
  id: string
  name: string
  description?: string
  requiredLevel: number
  companyId?: string
  Sectors: {
    id: string
    title: string
  }[]
  Levels?: {
    id: string
    title: string
    weight: number
    description?: string
  }[]
  Ratings?: {
    rating: number
    plan: string
    isBossRating: boolean
  }[]
}

export type Skill = {
  id: string
  name: string
  category: string
  description?: string
  Levels: {
    id: string
    title: string
    description: string
  }[]
}
export type SuccessionEntry = {
  id: string
  date: string
  readiness: string
  ranking: number
  status: string
  isInterimSuccessor: boolean
  Position: {
    id: string
    title: string
  }
  Candidate: {
    id: string
    image: string
    displayName: string
  }
}
export type QualificationEntry = {
  id: string
  title: string
  institution: string
  obtainedAt: string
  type: string
  field: string
}
export type GoalEntry = {
  id: string
  title: string
  description?: string
  plan?: string
  startDate?: string
  endDate?: string
  actualEndDate?: string
  actualStartDate?: string
  priority?: string
  status?: string
  progress: number
  success?: string
  source?: string
  comment?: string
  completed?: boolean
  category?: string
  type?: string
  Auth: { id: string; displayName: string }
}

export type IdpEntry = {
  id: string
  title: string
  description?: string
  plan?: string
  startDate?: string
  endDate?: string
  actualEndDate?: string
  actualStartDate?: string
  priority?: string
  status?: string
  progress: number
  success?: string
  source?: string
  comment?: string
  completed?: boolean
  category?: string
  type?: string
  trainer?: string
  duration?: number
  Auth: { id: string; displayName: string }
}

export type AutoCompleteItem = { id: string; value: string } & Partial<{
  [key: string]: any
}>

export type CompetencyBadgeEntry = {
  id: string
  name: string
  isSelected: boolean
  requiredLevel: number
  sector?: string
  createdAt?: string
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  translationKey?: string
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SocialMediaConfig = {
  links: SidebarNavItem[]
}

export type Dictionary = Record<string, string | Dictionary>
