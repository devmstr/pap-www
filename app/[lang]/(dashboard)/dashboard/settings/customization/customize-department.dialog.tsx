import { Icons } from '@/components/icons'
import { Loading } from '@/components/loading'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import { CustomizeDepartmentForm } from './customize-department.form'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CustomizeDepartmentDialogProps {
  params: { lang: Locale }
  searchParams: { search?: string; page?: string; per_page?: string }
  page: number
  per_page: number
}

export const CustomizeDepartmentDialog: React.FC<
  CustomizeDepartmentDialogProps
> = async ({
  params,
  page,
  per_page,
  searchParams
}: CustomizeDepartmentDialogProps) => {
  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const api = await useServerApi()
  const {
    tables: { units: tt },
    dialogs: { departments: t }
  } = await getDictionary(params.lang)
  const fetchDepartments = async () => {
    try {
      const {
        data: { data, _count }
      } = await api.get<{
        data: any[]
        _count: number
      }>('department', {
        params: searchParams
      })
      return { data, _count }
    } catch (error) {
      console.error(error)
    }
  }
  const fetchDivisions = async () => {
    try {
      const { data } = await api.get<{ data: any[]; _count: number }>(
        'division'
      )
      return data
    } catch (error) {
      console.error(error)
    }
  }
  const res = await fetchDepartments()
  const res2 = await fetchDivisions()
  if (!res || !res2) return <Loading />
  const { data: departments, _count } = res
  const { data: divisions } = res2

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group w-40 h-40 flex flex-col gap-2 justify-center items-center rounded-xl border hover:border-2 hover:border-primary/50  cursor-pointer bg-white hover:shadow-lg hover:scale-105  ">
          <Icons.building className="h-auto w-10 text-gray-300 group-hover:text-primary/50" />
          <h3 className="text-sm font-quicksand font-bold text-gray-400 group-hover:text-primary/50">
            {t['trigger-title']}
          </h3>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl h-fit space-y-3 ">
        <DialogHeader>
          <DialogTitle className="flex"> {t['title']}</DialogTitle>
          <DialogDescription className="flex text-md text-left max-w-4xl">
            {t['sub-title']}.
          </DialogDescription>
        </DialogHeader>
        {/* start  content */}
        <ScrollArea className="max-h-[calc(100vh-11rem)] ">
          <div className="px-1">
            <CustomizeDepartmentForm
              divisions={divisions}
              departments={departments}
              params={params}
              t={t.form}
              tt={tt}
              page={page}
              per_page={per_page}
              hasNextPage={end < _count}
              hasPrevPage={start > 0}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
