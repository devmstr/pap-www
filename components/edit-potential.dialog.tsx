import Link from 'next/link'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Dictionary, SkillRating, Skill } from '@/types'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Locale } from '@/i18n.config'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { EditPotentialForm } from './edit-potential-form'
import { getDictionary } from '@/lib/dictionaries'

interface EditPotentialDialogProps {
  params: { id?: string; lang: Locale }
  skills: Skill[]
  ratings: { you: SkillRating[]; boss: SkillRating[] }
}

export const EditPotentialDialog: React.FC<EditPotentialDialogProps> = async ({
  params,
  skills,
  ratings
}: EditPotentialDialogProps) => {
  const session = await getServerSession(authOptions)
  const {
    dialogs: { potential: t }
  } = await getDictionary(params.lang)
  const authId = params.id ?? session?.user.sub
  const assessments = skills.map(({ id, name, description, Levels }) => ({
    name,
    description,
    rating:
      session?.user.sub == authId
        ? ratings.you.find((item) => item.skillId === id)?.rating || 1
        : ratings.boss.find((item) => item.skillId === id)?.rating || 1,
    authId,
    skillId: id,
    plan: new Date().getFullYear().toString(),
    isBossRating: session?.user.sub != authId,
    Levels
  }))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex">
          <Button
            variant={'outline'}
            className="flex gap-3 w-fit text-sm  text-primary hover:text-primary/80"
          >
            {t['trigger-title']}
            <Icons.editSquare className="w-[1.2rem] h-[1.2rem] " />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-start h-full max-h-[80vh] max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex">{t['title']}</DialogTitle>
          <DialogDescription className="flex text-md text-left max-w-4xl">
            {t['sub-title']}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-1 ">
          {/* start  content */}
          <EditPotentialForm t={t.form} data={{ assessments }} params={params} />
          {/* end content */}
        </ScrollArea>
        <DialogFooter className="sm:justify-start mt-2">
          <p className="text-xs text-muted-foreground">
            {t['read-more-about']}{' '}
            <Link
              type="button"
              href={'#'}
              className="text-primary hover:underline"
            >
              {t['potential-assessment']}{' '}
            </Link>
            .{' '}
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
