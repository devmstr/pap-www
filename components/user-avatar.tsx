import { Avatar, AvatarImage } from '@ui/avatar'

import { useSession } from 'next-auth/react'

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    displayName: string
    image: string
    email: string
  }
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ ...props }) => {
  const { data: session } = useSession()
  if (!session) return null
  const user = session.user
  if (user.image)
    return (
      <Avatar {...props}>
        <AvatarImage
          className="w-full h-full object-cover object-center"
          alt="PfP Picture"
          src={user.image}
        />
      </Avatar>
    )
  return null
}
