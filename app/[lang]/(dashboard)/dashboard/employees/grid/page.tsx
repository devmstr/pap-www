import { Card } from '@/components/card'
import { NineGridBox } from '@/components/nine-grid-box-chart'
import useServerApi from '@/hooks/use-server-side-axios-auth'

type Data = {
  label: string
  data: {
    x: number
    y: number
    image: string
    displayName: string
    position: string
  }[]
}[]

interface PageProps {}

const Page: React.FC<PageProps> = async ({}: PageProps) => {
  const api = await useServerApi()
  const { data } = await api.get<Data>('charts/9-grid')
  data.map((i) => console.log(i.data))
  return (
    <Card className="">
      <NineGridBox data={data} />
    </Card>
  )
}

export default Page
