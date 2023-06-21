import { api } from '@shared/api'
import { IUser, ISignInResponse, ISignInResponseErr } from '../types'
import { AxiosResponse } from 'axios'

export const authApi = {
  signUp: async (data: IUser) => {
    return api.post('/registration', data)
  },

  signIn: async (params: IUser) => {
    return api.post<ISignInResponse, ISignInResponseErr>('/login', params)
  },
}
