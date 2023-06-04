import { api } from '@shared/api'
import { AxiosResponse } from 'axios'

export const checkAuth = async (): Promise<
  AxiosResponse<{ username: string }> | undefined
> => {
  try {
    return api.get<{ username: string }>('/get_current_user')
  } catch (e) {
    return undefined
  }
}
