'use client'
import axios from '@/lib/axios'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRefreshToken } from './use-refresh-token'
import { AxiosRequestConfig } from 'axios'

const useClientApi = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      async (config) => {
        if (!config.headers['Authorization']) {
          config.headers[
            'Authorization'
          ] = `Bearer ${session?.backendTokens.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && prevRequest.url !== '/refresh') {
          // await refreshToken()
          const { data } = await axios.get<{ backendTokens: any }>('/refresh', {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.refreshToken}`
            }
          })
          if (session && data) session.backendTokens = data.backendTokens
          prevRequest.headers[
            'Authorization'
          ] = `Bearer ${session?.backendTokens.accessToken}`
          return axios(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.request.eject(requestIntercept)
      axios.interceptors.response.eject(responseIntercept)
    }
  }, [session])

  return axios
}

export default useClientApi
