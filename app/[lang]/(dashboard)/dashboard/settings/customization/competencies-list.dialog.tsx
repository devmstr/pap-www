import { Icons } from '@/components/icons'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { authOptions } from '@/lib/auth'
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { getServerSession } from 'next-auth'
import { Locale } from '@/i18n.config'
import { Loading } from '@/components/loading'
import { CustomizeDivisionForm } from './customize-division.form'
import { Dictionary } from '@/types'
import { CustomizeDepartmentForm } from './customize-department.form'
import { AddCustomCompetencyForm } from './add-custom-competency.form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CompetencyTable } from '@/components/competency-table'
import { getDictionary } from '@/lib/dictionaries'

interface CompetenciesListDialogProps {
  params: { lang: Locale }
}

export const CompetenciesListDialog: React.FC<
  CompetenciesListDialogProps
> = async ({ params }: CompetenciesListDialogProps) => {
  const api = await useServerApi()
  const {
    tables: { competency: tt },
    dialogs: { competenciesList: t }
  } = await getDictionary(params.lang)
  const session = await getServerSession(authOptions)

  const { data } = await api.get('competency?custom=true')

  if (!data) return <Loading />
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group w-40 h-40 flex flex-col gap-2 justify-center items-center rounded-xl border hover:border-2 hover:border-primary/50  cursor-pointer bg-white hover:shadow-lg hover:scale-105  ">
          <Icons.cliBoardEdit className="h-auto w-[2.6rem]  text-gray-300 group-hover:text-primary/50" />
          <h3 className="text-sm font-quicksand font-bold text-gray-400 group-hover:text-primary/50">
            {t['trigger-title']}
          </h3>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl ">
        <ScrollArea className="h-fit max-h-fit px-1">
          <DialogHeader className="">
            <DialogTitle className="flex">{t['title']}</DialogTitle>
            <DialogDescription className="flex text-md text-left max-w-4xl ">
              {t['sub-title']}.
            </DialogDescription>
          </DialogHeader>
          {/* start  content */}
          <CompetencyTable t={tt} data={data} params={params} />{' '}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
