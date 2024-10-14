import React from 'react'
import {
  TransformWrapper,
  TransformComponent,
  useControls
} from 'react-zoom-pan-pinch'
import { Button } from './ui/button'
import { Icons } from './icons'

interface ZoomableIframeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ZoomableIframe({ children }: ZoomableIframeProps) {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()
    return (
      <div className="flex justify-center text-sm gap-3 text-muted-foreground/60">
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
        <Button
          variant={'outline'}
          className="hover:text-foreground"
          onClick={() => resetTransform()}
        >
          <Icons.collapse className="mr-2 w-5 h-5" /> Reset
        </Button>
      </div>
    )
  }
  return (
    <TransformWrapper>
      <Controls />
      <TransformComponent
        contentClass="flex justify-center "
        wrapperStyle={{ width: '100%' }}
        contentStyle={{ width: '100%' }}
      >
        {children}
      </TransformComponent>
    </TransformWrapper>
  )
}
