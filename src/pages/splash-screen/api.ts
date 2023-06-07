import { api } from '@shared/api'
import { AxiosResponse } from 'axios'

export const checkAuth = async () => {
  return api.get<{ username: string }>('/get_current_user')
}
