import { Icons } from './icons'
import { Card } from './card'
import { cn, formatDateTime } from '@/lib/utils'
import { StatsCardItem } from '@/types'

interface StatsCardProps {
  data: StatsCardItem
}

export const StatsCard: React.FC<StatsCardProps> = ({
  data: { icon, title, stats, /* last2stats ,*/ updateAt }
}: StatsCardProps) => {
  const Icon = Icons[(icon as keyof typeof Icons) || 'arrowRight']

  return (
    <Card className="p-8 w-48 h-[13rem] flex flex-col gap-3">
      <div className="flex gap-3 justify-center items-center">
        <div className="flex-shrink-0">
          <Icon className={cn('flex h-[1.4rem] w-[1.4rem]')} />
        </div>
        <span className="text-xl font-medium">{title}</span>
      </div>
      <div className="flex justify-center">
        <span className="text-7xl font-inter font-semibold">{stats}</span>
      </div>
      <div className="flex justify-center">
        {updateAt ? (
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 opacity-50">
            {formatDateTime(updateAt)}
          </span>
        ) : (
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 opacity-50">
            Never Updated
          </span>
        )}
      </div>
    </Card>
  )
}
