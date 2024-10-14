import { Card } from '@/components/card'
import { EmployeeTable } from '@/components/employee-table'
import { Locale } from '@/i18n.config'
import useServerApi from '@/hooks/use-server-side-axios-auth'
import { EmployeeEntry } from '@/types'
import { AddEmployeeDialog } from './add-employee.dialog'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { TeamTable } from '../profile/[id]/team/team-table'

import { getDictionary } from '@/lib/dictionaries'
interface PageProps {
  params: { lang: Locale; id?: string }
  searchParams: { search?: string; page?: string; per_page?: string }
}

const Page: React.FC<PageProps> = async ({
  params,
  searchParams
}: PageProps) => {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'
  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const api = await useServerApi()

  const session = await getServerSession(authOptions)
  const {
    pages: {
      employees: { addEmployeeDialog: t }
    },
    tables: { employees: tt, team: tteam }
  } = await getDictionary(params.lang)
  const role = session?.user.role || 'ANYTHING'

  const getEmployees = async () => {
    if (['HR', 'CEO'].includes(role)) {
      const { data } = await api.get<{ data: EmployeeEntry[]; _count: number }>(
        `auth/all`,
        {
          params: searchParams
        }
      )
      return data
    } else {
      const { data } = await api.get<{ data: EmployeeEntry[]; _count: number }>(
        `team/members/${session?.user.sub}`,
        {
          params: searchParams
        }
      )
      return data
    }
  }

  const { data: employees, _count } = await getEmployees()

  return (
    <Card>
      {['HR', 'CEO'].includes(role) ? (
        <div>
          <AddEmployeeDialog t={t} params={params} />
          <EmployeeTable
            page={+page}
            per_page={+per_page}
            hasNextPage={end < _count}
            hasPrevPage={start > 0}
            t={tt}
            data={employees}
          />
        </div>
      ) : (
        <TeamTable
          t={tteam}
          page={+page}
          per_page={+per_page}
          hasNextPage={end < _count}
          hasPrevPage={start > 0}
          data={employees}
          params={params}
        />
      )}
    </Card>
  )
}

export default Page
