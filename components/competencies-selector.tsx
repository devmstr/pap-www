import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { authOptions } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { AddCompetencyDialog } from './add-competency-dialog'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Icons } from './icons'
import { Dictionary } from '@/types'

interface CompetenciesSelectorProps {
  params: { lang: Locale; id?: string }
  data: { id: string; name: string }[]
}

export const CompetenciesSelector: React.FC<
  CompetenciesSelectorProps
> = async ({ params, data }: CompetenciesSelectorProps) => {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 px-4 py-5 flex-wrap border rounded-md min-h-16">
        {data.map(({ id, name }) => (
          <Badge
            key={id}
            variant={'default'}
            className={cn(
              'flex gap-1 h-8 text-sm text-primary font-quicksand border-2 rounded-md border-dashed py-1 px-3 cursor-pointer transition-colors ease-in-out duration-500 text-nowrap '
            )}
          >
            <Icons.checkSquare className="w-4 h-4 text-primary" />
            {name}
          </Badge>
        ))}
        <AddCompetencyDialog params={params} />
      </div>
    </div>
  )
}
