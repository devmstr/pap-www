'use client'

import api from '@/lib/axios'
import { useSession } from 'next-auth/react'

export const useRefreshToken = () => {
  const { data: session } = useSession()

  const refreshToken = async () => {
    const { data } = await api.get('/refresh', {
      headers: {
        Authorization: `Bearer ${session?.backendTokens.refreshToken}`
      }
    })
    if (session)
      session.backendTokens.accessToken = data.backendTokens.accessToken
  }
  return refreshToken
}
