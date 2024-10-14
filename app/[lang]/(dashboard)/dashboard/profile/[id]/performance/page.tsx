import { Card } from '@/components/card'
import { GoalTable } from '@/components/goals-table'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { Locale } from '@/i18n.config'
import { PerformanceSchema } from '@/lib/validations/globals'
import { z } from 'zod'
import { Loading } from '@/components/loading'
import { AddGoalDialog } from './add-goal.dialog'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { lang: Locale; id: string }
}

type GoalEntry = z.infer<typeof PerformanceSchema> & {
  Auth: { id: string; displayName: string }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions)
  const {
    tables: { performance: tt }
  } = await getDictionary(params.lang)
  const api = await useServerApi()
  const authRole = session?.user.role ?? 'ANYTHING'
  const { data } = await api.get<GoalEntry[]>(`performance?authId=${params.id}`)

  if (!data) return <Loading />

  return (
    <div>
      <Card>
        {['HR', 'MANAGER', 'CEO', 'HRD'].includes(authRole) && (
          <AddGoalDialog params={params} />
        )}
        <GoalTable t={tt} data={data} />
      </Card>
    </div>
  )
}

export default Page
