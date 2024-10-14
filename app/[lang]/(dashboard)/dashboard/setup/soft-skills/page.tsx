import { Card } from '@/components/card'
import { SoftSkillsCheckboxList } from './soft-skills-form'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Skill } from '@/types'

interface PageProps {
  params: {
    lang: Locale
  }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const api = await useServerApi()
  const {
    pages: {
      setup: {
        pages: { units }
      }
    }
  } = await getDictionary(params.lang)

  const { data } = await api.get<Skill[]>('/skill/all')

  return (
    <div className="">
      <Card className="space-y-6">
        <h1 className="font-inter text-foreground/80 font-black text-3xl ">
          Setup your company soft skills.
        </h1>
        <p className="text-base text-muted-foreground/80">
          Choose 5 to 8 of soft-skills configuration that align with your
          organizational culture and values, laying the foundation for assessing
          employee potential in the future. By defining these traits now, you'll
          be equipped to evaluate and develop your team effectively, empowering
          them to thrive and contribute to the success of your company.
        </p>
        <SoftSkillsCheckboxList
          t={units}
          params={params}
          data={data.map((i) => ({ ...i, value: i.name }))}
        />
      </Card>
    </div>
  )
}

export default Page
