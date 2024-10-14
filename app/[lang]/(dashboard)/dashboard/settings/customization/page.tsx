import { Card } from '@/components/card'
import { Locale } from '@/i18n.config'
import { Icons } from '@/components/icons'
import { CustomizeDivisionsDialog } from './customize-divisions.dialog'
import { CustomizeDepartmentDialog } from './customize-department.dialog'
import { CustomizeSkillsDialog } from './customize-skills.dialog'
import { CustomizeSoftSkillsDialog } from './customize-soft-skills.dialog'
import { CustomizePasswordsDialog } from './customize-passwords.dialog'
import { CompetenciesListDialog } from './competencies-list.dialog'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale }
  searchParams: { search?: string; page?: string; per_page?: string }
}

const Page: React.FC<PageProps> = async ({
  params,
  searchParams
}: PageProps) => {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'

  const {
    pages: {
      settings: {
        pages: { customization: t }
      }
    }
  } = await getDictionary(params.lang)
  return (
    <Card>
      <h1 className="text-xl font-black font-inter">{t['title']}</h1>
      <p className="text-muted-foreground text-base">{t['sub-title']}.</p>
      <div className="flex flex-wrap justify-center gap-6 p-8 mt-4">
        <CustomizeDivisionsDialog
          params={params}
          page={+page}
          per_page={+per_page}
          searchParams={searchParams}
        />
        <CustomizeDepartmentDialog
          params={params}
          page={+page}
          per_page={+per_page}
          searchParams={searchParams}
        />
        <CustomizeSkillsDialog params={params} />
        <CompetenciesListDialog params={params} />
        <CustomizeSoftSkillsDialog params={params} />
        <CustomizePasswordsDialog
          params={params}
          page={+page}
          per_page={+per_page}
          searchParams={searchParams}
        />
      </div>
    </Card>
  )
}

export default Page
