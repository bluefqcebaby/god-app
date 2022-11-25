import {api} from './cards';
import {AxiosError, AxiosResponse} from 'axios';

interface signUpInProps {
  username: string;
  password: string;
}

export const signUp = async (data: signUpInProps) => {
  return await api.post('/registration', data);
};

export const signIn = async (params: signUpInProps) => {
  const data = await api.post<{access_token: string}>('/login', params);
  return data.data.access_token;
};

export const checkAuth = async (): Promise<
  AxiosResponse<{username: string}> | undefined
> => {
  try {
    return await api.get<{username: string}>('/get_current_user');
  } catch (e) {
    const err = e as AxiosError;
    return;
  }
};
