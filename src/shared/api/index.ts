import { sessionStore } from '@shared/store/session-store'
import axios from 'axios'
import Config from 'react-native-config'

export const api = axios.create({
  baseURL: Config.API_URL,
})

api.interceptors.request.use(async request => {
  sessionStore.jwtToken &&
    (request.headers!.Authorization = `Bearer ${sessionStore.jwtToken}`)
  return request
})
