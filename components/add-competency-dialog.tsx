import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Link from 'next/link'
import { AddCompetencyForm } from './add-competency-form'
import { Competency, CompetencyBadgeEntry } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'

interface AddCompetencyDialogProps {
  params: { lang: Locale; id?: string }
}

export const AddCompetencyDialog: React.FC<AddCompetencyDialogProps> = async ({
  params
}: AddCompetencyDialogProps) => {
  const api = await useServerApi()
  const {
    dialogs: { competency: t }
  } = await getDictionary(params.lang)

  const session = await getServerSession(authOptions)
  const role = session?.user.role || 'ANYTHING'
  const authId = params.id || session?.user.sub

  const { data: selected } = await api.get<Competency[]>(
    `competency/auth/${authId}`
  )
  const { data: competencies } = await api.get<Competency[]>(`competency`)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="h-8 relative flex gap-1 rounded-md text-primary font-quicksand border-dashed border-2  border-primary hover:text-primary group font-semibold px-3 py-1"
        >
          {t['trigger-title']}
          <Icons.addCircle className="h-5 w-5 text-primary group-hover:text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] sm:h-fit container max-w-5xl">
        <ScrollArea className="h-full p-0">
          <DialogHeader>
            <DialogTitle className="flex">{t['title']}</DialogTitle>
            <DialogDescription className="flex text-left">
              {t['sub-title']}
            </DialogDescription>
          </DialogHeader>
          <AddCompetencyForm
            params={params}
            t={t.form}
            data={competencies.map((i) => ({
              ...i,
              value: i.name,
              isSelected: false,
              sector: i.Sectors[0]?.title
            }))}
            selected={selected.map((i) => ({
              ...i,
              value: i.name,
              isSelected: true,
              sector: i.Sectors[0]?.title
            }))}
          />
          {/* footer */}

          <DialogFooter className="sm:justify-start mt-8">
            <div className="flex flex-col gap-2">
              {['HR', 'CEO'].includes(role) && (
                <div className="flex flex-col gap-2  ">
                  <h1 className="text-lg font-semibold leading-none tracking-tight">
                    {' '}
                    {t['or-create-a-custom-competency']}{' '}
                  </h1>
                  <p className="text-sm  text-muted-foreground flex gap-1">
                    {t['or-create-a-custom-competency-sub-paragraph']}

                    <Link
                      className="flex items-center gap-1 text-primary hover:underline"
                      href={'/dashboard/settings/customization'}
                    >
                      {t['here']}
                      <Icons.expend className="w-3 h-auto text-primary" />
                    </Link>
                  </p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {t['read-more-about']}{' '}
                <Link href={'#'} className="text-primary hover:underline">
                  {t['competencies']}{' '}
                </Link>
                .{' '}
              </p>
            </div>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
