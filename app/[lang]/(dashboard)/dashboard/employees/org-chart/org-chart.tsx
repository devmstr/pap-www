'use client'
import { Icons } from '@/components/icons'
import { OrgChartIFrame } from '@/components/org-chart/chart-component'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dictionary } from '@/types'
import { useRef } from 'react'

interface PageProps {
  t: Dictionary
  data: object[]
  isHyperLinked: boolean
}

export const OrganizationalChartFrame: React.FC<PageProps> = ({
  t,
  data,
  isHyperLinked = false
}: PageProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  let addNodeChildFunc: (node: { nodeId: string; parentNodeId: string }) => void
  let pathFromRootToNode: (nodeId: string) => void
  let expandAll: () => void
  let collapseAll: () => void
  let zoomIn: () => void
  let zoomOut: () => void

  function onNodeClick(nodeId: string) {
    //
  }

  return (
    <div className="min-h-[576px] hidden lg:block">
      <div className="flex justify-between">
        <div className="flex gap-3 max-w-md items-end">
          <Input
            name="inputName"
            type="number"
            placeholder={t['employee-number-here']}
            ref={inputRef}
          />
          <Button
            onClick={() => pathFromRootToNode(inputRef.current?.value || '')}
          >
            {t['find']}
          </Button>
        </div>
        <div className="flex text-sm gap-3 text-muted-foreground/60 ">
          <Button
            className="hover:text-foreground"
            variant={'outline'}
            onClick={() => expandAll()}
          >
            <Icons.expand className="mr-2 w-5 h-5" /> {t['expend']}
          </Button>
          <Button
            className="hover:text-foreground"
            variant={'outline'}
            onClick={() => collapseAll()}
          >
            <Icons.collapse className="mr-2 w-5 h-5" /> {t['collapse']}
          </Button>
          <Button
            className="hover:text-foreground"
            variant={'outline'}
            onClick={() => zoomIn()}
          >
            <Icons.zoomIn className="w-5 h-5" />
          </Button>
          <Button
            className="hover:text-foreground"
            variant={'outline'}
            onClick={() => zoomOut()}
          >
            <Icons.zoomOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <OrgChartIFrame
        isHyperLinked={isHyperLinked}
        setClick={(click: any) => (addNodeChildFunc = click)}
        onNodeClick={onNodeClick}
        data={data}
        setUpToTheRootHighlighted={(click: any) => (pathFromRootToNode = click)}
        expandAll={(click: any) => (expandAll = click)}
        collapseAll={(click: any) => (collapseAll = click)}
        zoomIn={(click: any) => (zoomIn = click)}
        zoomOut={(click: any) => (zoomOut = click)}
      />
    </div>
  )
}
