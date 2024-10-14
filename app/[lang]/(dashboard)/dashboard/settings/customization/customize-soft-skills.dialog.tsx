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
import { authOptions } from '@/lib/auth'
import { Dictionary, Skill } from '@/types'
import { getServerSession } from 'next-auth'
import { CustomizeSoftSkillsForm } from './costomize-soft-skills.form'
import { getDictionary } from '@/lib/dictionaries'

interface CustomizeSoftSkillsDialogProps {
  params: { lang: Locale }
}

export const CustomizeSoftSkillsDialog: React.FC<
  CustomizeSoftSkillsDialogProps
> = async ({ params }: CustomizeSoftSkillsDialogProps) => {
  const api = await useServerApi()
  const {
    dialogs: { softSkills: t }
  } = await getDictionary(params.lang)
  const session = await getServerSession(authOptions)

  const fetchData = async () => {
    try {
      const { data: all } = await api.get<Skill[]>('/skill/all')
      const { data: mySkills } = await api.get<Skill[]>('/skill/me')
      return { all, mySkills }
    } catch (error) {
      console.error(error)
    }
  }
  const data = await fetchData()

  if (!data) return <Loading />

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group w-40 h-40 flex flex-col gap-2 justify-center items-center rounded-xl border hover:border-2 hover:border-primary/50  cursor-pointer bg-white hover:shadow-lg hover:scale-105  ">
          <Icons.lightBulb className="h-auto w-11 text-gray-300 group-hover:text-primary/50" />
          <h3 className="text-sm font-quicksand font-bold text-gray-400 group-hover:text-primary/50">
            {t['trigger-title']}
          </h3>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl h-fit  ">
        <DialogHeader>
          <DialogTitle className="flex">{t['title']}</DialogTitle>
          <DialogDescription className="flex text-md text-left max-w-2xl">
            {t['sub-title']}.
          </DialogDescription>
        </DialogHeader>
        {/* start  content */}
        <CustomizeSoftSkillsForm
          data={data.all.map((i) => ({ ...i, value: i.name }))}
          selected={data.mySkills.map((i) => i.name)}
          params={params}
          t={t.form}
        />
      </DialogContent>
    </Dialog>
  )
}
