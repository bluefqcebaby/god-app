import { api } from '@shared/api'
import { IUser, ISignInResponse } from '../types'
import { AxiosResponse } from 'axios'

export const authApi = {
  signUp: async (data: IUser): Promise<any> => {
    return await api.post('/registration', data)
  },

  signIn: async (params: IUser) => {
    const response = await api.post<ISignInResponse>('/login', params)
    return response.data
  },
}
