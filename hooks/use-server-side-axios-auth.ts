import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

const useServerApi = async () => {
  const session = await getServerSession(authOptions)
  const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.backendTokens.accessToken}`
    }
  })
  return axiosAuth
}

export default useServerApi
