import axios from 'axios'
import { parseCookies } from 'nookies'

export const baseURL = 'http://localhost:3000'

export function getAPIClient(context?: any) {
  const { ['solar.token']: token } = parseCookies(context)

  const api = axios.create({ baseURL })

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return api
}
