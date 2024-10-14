import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})
