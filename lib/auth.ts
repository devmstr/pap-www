import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import api from '@/lib/axios'

import { JWT } from 'next-auth/jwt'

const BUFFER_TIME = 5 * 1000 // 5 seconds

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await api.get('/refresh', {
      headers: {
        Authorization: `Bearer ${token.backendTokens.refreshToken}`
      }
    })

    return {
      ...token,
      expiresIn: data.expiresIn,
      backendTokens: data.backendTokens
    }
  } catch (error) {
    throw error
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'signWithEmailAndPassword',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'password'
        },
        keepMeLoggedIn: {
          label: 'Keep me logged in',
          type: 'checkbox'
        }
      },
      async authorize(credentials) {
        const keepMeLoggedIn = Boolean(credentials?.keepMeLoggedIn)

        if (!credentials?.email || !credentials?.password) return null

        try {
          const { email, password } = credentials

          const { data, status } = await api.post('/auth/login', {
            email,
            password
          })

          if (!data) return null

          if (status !== 200) throw new Error(data.message)

          const user = { ...data, keepMeLoggedIn }

          return user
        } catch (error: any) {
          throw new Error(error.response.data.message)
        }
      }
    })
  ],

  session: {
    // stay for 4 hours
    maxAge: 4 * 60 * 60,
    strategy: 'jwt'
  },

  pages: {
    signIn: '/en/login'
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) return { ...token, ...user }

      if (trigger === 'update') {
        return { ...token, user: session.user }
      }

      if (token.expiresIn > Date.now() + BUFFER_TIME) return token

      return await refreshToken(token)
    },

    async session({ token, session }) {
      const expires = token.keepMeLoggedIn
        ? new Date(new Date().getTime() + 720 * 3600 * 1000).toISOString() // stay for 30 days
        : new Date(new Date().getTime() + 4 * 3600 * 1000).toISOString()
      // stay for 4 hours
      return {
        ...token,
        expires
      }
    },

    async signIn({ user, account, credentials }) {
      const keepMeLoggedIn = Boolean(credentials?.keepMeLoggedIn)
      if (account?.provider === 'google') {
        // Google OAuth login logic
        const { email, image, name: displayName } = user

        try {
          const { data } = await api.post('/auth/o-auth/signin', {
            email,
            image,
            displayName
          })

          if (!data) return false

          user.backendTokens = data.backendTokens
          user.expiresIn = data.expiresIn
          user.user = data.user
          user.keepMeLoggedIn = keepMeLoggedIn

          return true
        } catch (error) {
          return false
        }
      }
      if (user) return true
      return false
    }
  }
}
