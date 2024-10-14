import { cn } from '@/lib/utils'
import { Icons } from './icons'

export type StatusVariant = 'paid' | 'unpaid'

interface PaymentStatusProps {
  variant?: StatusVariant
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({
  variant = 'paid'
}: PaymentStatusProps) => {
  const Icon = Icons[variant as keyof typeof Icons]
  return (
    <div className="flex items-center">
      <div
        className={cn(
          variant == 'unpaid' && 'bg-[#feefcb] text-[#8f500d]',
          variant == 'paid' && 'bg-[#e9f5ce] text-[#447003]',
          'h-5 pl-1 pr-2 flex gap-1 w-fit text-md rounded-full capitalize'
        )}
      >
        <Icon className="w-auto h-full p-[0.15rem]" /> {variant}
      </div>
    </div>
  )
}
