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
import { AutoCompleteItem, CompetencyBadgeEntry, Dictionary } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AddSuccessionForm } from './add-succession-form'
import { Locale } from '@/i18n.config'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { getDictionary } from '@/lib/dictionaries'

interface AddSuccussionDialogProps {
  params: { lang: Locale; id?: string }
}

export const AddSuccussionDialog: React.FC<AddSuccussionDialogProps> = async ({
  params
}: AddSuccussionDialogProps) => {
  const api = await useServerApi()
  const {
    pages: {
      succession: { addSuccessionDialog: t }
    }
  } = await getDictionary(params.lang)

  const fetchEmployees = async () => {
    const { data } = await api.get('/auth/all/short')
    return data
  }

  const fetchKeyPositions = async () => {
    const { data } = await api.get('/position/?key=true')
    return data
  }

  const keyPositions = await fetchKeyPositions()
  const employees = await fetchEmployees()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="flex gap-3 w-fit  text-primary hover:text-primary/80"
        >
          {'Add'}
          <Icons.addCircle className="w-6 h-6 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] sm:h-fit container max-w-5xl">
        <ScrollArea className="h-full p-0">
          <DialogHeader>
            <DialogTitle className="flex">{t['title']}</DialogTitle>
            <DialogDescription className="flex text-left">
              {t['sub-title']}
            </DialogDescription>
          </DialogHeader>
          <AddSuccessionForm
            t={t.form}
            employees={employees}
            params={params}
            keyPositions={keyPositions}
          />
          <DialogFooter className="sm:justify-start mt-8">
            <DialogClose asChild>
              <p className="text-xs text-muted-foreground">
                {t['read-more-about']}{' '}
                <Link href={'#'} className="text-primary hover:underline">
                  {t['succession-planning']}{' '}
                </Link>
                .{' '}
              </p>
            </DialogClose>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
