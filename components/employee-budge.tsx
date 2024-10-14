import { AUTH_ROLES } from '@/config/globals'
import { cn } from '@/lib/utils'

export const EmployeeBadge = ({ role }: { role: string }) => {
  const roleShortcut = {
    MANAGER: 'Ma',
    HR: 'Hr',
    HRD: 'Hrd',
    CEO: 'Ceo'
  }
  return (
    <span
      className={cn(
        'capitalize flex items-end mb-[2px]  font-bold text-xs font-fredoka',
        role == AUTH_ROLES.MANAGER && 'text-blue-500',
        role == AUTH_ROLES.HR && 'text-yellow-500',
        role == AUTH_ROLES.HDR && 'text-orange-500',
        role == AUTH_ROLES.CEO && 'text-red-500'
      )}
    >
      {roleShortcut[role as 'MANAGER' | 'HR' | 'HRD' | 'CEO']}
    </span>
  )
}
