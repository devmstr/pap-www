import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      sub: string
      email: string
      displayName: string
      role: string
      image: string
      onBoarded: boolean
    }

    backendTokens: {
      accessToken: string
      refreshToken: string
    }
    keepMeLoggedIn: boolean
    expiresIn: number
  }
}

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      sub: string
      email: string
      displayName: string
      role: string
      image: string
      onBoarded: boolean
    }
    backendTokens: {
      accessToken: string
      refreshToken: string
    }
    keepMeLoggedIn: boolean
    expiresIn: number
  }
}

declare module 'next-auth' {
  interface User {
    user: {
      sub: string
      email: string
      displayName: string
      role: string
      image: string
      onBoarded: boolean
    }

    backendTokens: {
      accessToken: string
      refreshToken: string
    }
    keepMeLoggedIn: boolean
    expiresIn: number
  }
}
