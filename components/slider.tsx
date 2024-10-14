import { cn } from '@/lib/utils'
import { Slider as ShadCnSLider } from '@/components/ui/slider'

type SliderProps = React.ComponentProps<typeof ShadCnSLider>

export function Slider({ className, value, step, max, ...props }: SliderProps) {
  return (
    <ShadCnSLider
      defaultValue={value}
      max={max || 10}
      step={step || 1}
      className={cn('w-full', className)}
      value={value}
      onValueChange={props.onValueChange}
      {...props}
    />
  )
}
