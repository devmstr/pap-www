import { Icons } from '@/components/icons'
import { Loading } from '@/components/loading'
import { PasswordsTable } from '@/components/passwords-table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'

interface CustomizePasswordsDialogProps {
  params: { lang: Locale }
  page: number
  per_page: number
  searchParams: { search?: string; page?: string; per_page?: string }
}

export const CustomizePasswordsDialog: React.FC<
  CustomizePasswordsDialogProps
> = async ({
  params,
  page,
  per_page,
  searchParams
}: CustomizePasswordsDialogProps) => {
  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const api = await useServerApi()
  const {
    tables: { passwords: tt },
    dialogs: { passwords: t }
  } = await getDictionary(params.lang)

  const fetchData = async () => {
    try {
      const {
        data: { data, _count }
      } = await api.get<{ data: any[]; _count: number }>('passwords', {
        params: searchParams
      })
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
          <Icons.shieldSecurity className="h-auto w-11 text-gray-300 group-hover:text-primary/50" />
          <h3 className="text-sm font-quicksand font-bold text-gray-400 group-hover:text-primary/50">
            {t['trigger-title']}
          </h3>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl h-fit  ">
        <DialogHeader>
          <DialogTitle className="flex">{t['title']}</DialogTitle>
          <DialogDescription className="flex text-md text-left max-w-4xl">
            {t['sub-title']}
          </DialogDescription>
        </DialogHeader>
        {/* start  content */}
        <ScrollArea className="max-h-[calc(100vh-11rem)] ">
          <div className="px-1">
            <PasswordsTable
              t={tt}
              data={data}
              page={+page}
              per_page={+per_page}
              hasNextPage={end < _count}
              hasPrevPage={start > 0}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
