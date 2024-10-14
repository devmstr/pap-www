import { Icons } from '@/components/icons'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Locale } from '@/i18n.config'
import { Loading } from '@/components/loading'
import { CustomizeDivisionForm } from './customize-division.form'
import { getDictionary } from '@/lib/dictionaries'

interface CustomizeDivisionsDialogProps {
  params: { lang: Locale }
  searchParams: { search?: string; page?: string; per_page?: string }
  page: number
  per_page: number
}

export const CustomizeDivisionsDialog: React.FC<
  CustomizeDivisionsDialogProps
> = async ({
  params,
  page,
  per_page,
  searchParams
}: CustomizeDivisionsDialogProps) => {
  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)
  const {
    tables: { units: tt },
    dialogs: { divisions: t }
  } = await getDictionary(params.lang)

  const api = await useServerApi()

  const fetchData = async () => {
    try {
      const {
        data: { data, _count }
      } = await api.get<{ data: any[]; _count: number }>('division')
      return { data, _count }
    } catch (error) {
      console.error(error)
    }
  }

  const res = await fetchData()
  if (!res) return <Loading />
  const { data, _count } = res

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group w-40 h-40 flex flex-col gap-2 justify-center items-center rounded-xl border hover:border-2 hover:border-primary/50  cursor-pointer bg-white hover:shadow-lg hover:scale-105  ">
          <Icons.division className="h-auto w-10 text-gray-300 group-hover:text-primary/50" />
          <h3 className="text-sm font-quicksand font-bold text-gray-400 group-hover:text-primary/50">
            {t['trigger-title']}
          </h3>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl h-fit space-y-6 ">
        <DialogHeader>
          <DialogTitle className="flex"> {t['title']}</DialogTitle>
          <DialogDescription className="flex text-md text-left max-w-4xl">
            {t['sub-title']}.
          </DialogDescription>
        </DialogHeader>
        {/* start  content */}
        <CustomizeDivisionForm
          tt={tt}
          data={data}
          params={params}
          t={t.form}
          page={page}
          per_page={per_page}
          hasNextPage={end < _count}
          hasPrevPage={start > 0}
        />
      </DialogContent>
    </Dialog>
  )
}
