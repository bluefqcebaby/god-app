import axios, {AxiosError} from 'axios';
import {BASE_URL} from '../constants/strings';
import {showToast} from '../lib/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async request => {
  const token = await AsyncStorage.getItem('token');
  token && (request.headers!.Authorization = `Bearer ${token}`);
  console.log(token);
  return request;
});

export interface ICard {
  title: string;
  date: number;
  counter: number;
  id: string;
}

export const getCards = async () => {
  const {data} = await api.get<ICard[]>('/get_cards');
  return data;
};

export interface dtoCard {
  counter: number;
  title: string;
  date: number;
  id?: string;
}

export const addCard = (card: dtoCard) => {
  return api.post('/add_card', card);
};

export const deleteCard = (id: String) => {
  return api.delete(`/delete_card/${id}`);
};

export const updateCard = async (card: dtoCard): Promise<ICard> => {
  const response = await api.put<ICard>(`/update_card/${card.id}`, card);
  return response.data;
};

export const handleError = (e: any) => {
  if (axios.isAxiosError(e)) {
    const err = e as AxiosError;
    showToast('error', `${err.message || 'Что-то пошло не так'}`);
  } else {
    console.log(e);
  }
};
