import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface ScoreBudgeProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
}

export const ScoreBudge: React.FC<ScoreBudgeProps> = ({
  value = 0,
  className
}: ScoreBudgeProps) => {
  return (
    <span
      className={cn(
        'text-white px-2 py-1 rounded-full text-xs font-medium',
        value >= 100 && 'bg-[#d1f6c0] text-[#087003]',
        value < 100 && 'bg-[#eef5ce] text-[#447003]',
        value <= 80 && 'bg-[#fcfed6] text-[#b9aa09]',
        value <= 60 && 'bg-[#fee6cb] text-[#8f3f0d]',
        value <= 20 && 'bg-[#f5cece] text-[#700303]',
        value <= 10 && 'bg-[#f5f6f7] text-[#686868]',
        className
        // value > 80 && 'bg-green-500',
        // value < 80 && 'bg-yellow-500',
        // value < 60 && 'bg-orange-500',
        // value < 20 && 'bg-red-500',
        // value == 1 && 'bg-gray-500',
        // value == 0 && 'bg-gray-500/50'
      )}
    >
      {value + '%'}
    </span>
  )
}
