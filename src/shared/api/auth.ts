import { AxiosResponse } from 'axios'
import { api } from '.'

interface signUpInProps {
  username: string
  password: string
}

export const signUp = async (data: signUpInProps) => {
  return await api.post('/registration', data)
}

export const signIn = async (params: signUpInProps) => {
  const data = await api.post<{ access_token: string }>('/login', params)
  return data.data.access_token
}
