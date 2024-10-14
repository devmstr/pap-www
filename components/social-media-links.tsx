import Link from 'next/link'
import { Icons } from './icons'
import { socialMediaConfig } from '@/config/site'

interface SocialMediaLinksProps {}

export const SocialMediaLinks: React.FC<
  SocialMediaLinksProps
> = ({}: SocialMediaLinksProps) => {
  return (
    <div className="flex gap-3">
      {socialMediaConfig.links.map((link, index) => {
        const Icon = Icons[link.icon || 'close']
        return (
          <div
            key={index}
            className="border-primary border-b-2 hover:border-white pb-1 relative  group "
          >
            <Link
              key={link.title}
              href={link.href!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <Icon className=" w-6 h-6 group-hover:animate-bounce duration-200 ease-in-out " />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
