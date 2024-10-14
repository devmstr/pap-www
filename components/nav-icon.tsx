'use client'

import { cn } from '@/lib/utils'

interface BurgerButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  state: boolean
}
export const BurgerMenu: React.FC<BurgerButtonProps> = ({
  state,
  className
}) => {
  return (
    <div className={cn('menu-btn', className, state ? 'open' : '')}>
      <div className={'menu-btn__burger'} />
    </div>
  )
}
