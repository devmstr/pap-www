import { SocialMediaConfig } from '@/types'

type SiteConfig = {
  name: string
  shortName: string
  description: string
  url: string
  ogImage: string
  phone: string
  links: {
    twitter: string
    facebook: string
    instagram: string
    linkedin: string
  }
  authors: [
    {
      name: string
      emails: string[]
      github: string
      url: string
    }
  ]
}

export const siteConfig: SiteConfig = {
  name: 'Perfect Assess Pro',
  shortName: 'Pap',
  description: 'Cloud-based HCM SasS Application',
  url: 'https://perfectassesspro.com',
  phone: '+213 658 769 361',
  ogImage: 'https://perfectassesspro.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/perfectassesspro',
    facebook: 'https://facebook.com/perfectassesspro',
    instagram: 'https://instagram.com/perfectassesspro',
    linkedin: 'https://linkedin.com/perfectassesspro'
  },
  authors: [
    {
      name: 'DevMSTR',
      emails: [
        'contact@ismailsahli.me',
        'mohamed.ismail.sahli@gmail.com',
        'sahli.ismail.med@gmail.com',
        'sahli.med@outlook.com'
      ],
      github: 'https://gitthub.com/devmstr',
      url: 'https://ismailsahli.me'
    }
  ]
}

export const socialMediaConfig: SocialMediaConfig = {
  links: [
    {
      title: 'Facebook',
      href: 'https://facebook.com/perfectassesspro',
      icon: 'facebook'
    },
    {
      title: 'Twitter',
      href: 'https://twitter.com/perfectassesspro',
      icon: 'twitter'
    },
    {
      title: 'LinkedIn',
      href: 'https://linkedin.com/perfectassesspro',
      icon: 'linkedin'
    },
    {
      title: 'instagram',
      href: 'https://instagram.com/perfectassesspro',
      icon: 'instagram'
    }
  ]
}
