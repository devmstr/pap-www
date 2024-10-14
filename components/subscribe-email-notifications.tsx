import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'

interface SubscribeEmailNotificationsProps {}

export const SubscribeEmailNotifications: React.FC<
  SubscribeEmailNotificationsProps
> = ({}: SubscribeEmailNotificationsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-white" htmlFor="email">
        Email
      </Label>
      <div className="flex w-full max-w-sm items-center space-x-3">
        <Input type="email" placeholder="Email" />
        <Button
          variant={'outline'}
          className="bg-primary text-white"
          type="submit"
        >
          Subscribe
        </Button>
      </div>
    </div>
  )
}
