import {api} from './cards';
import {BASE_URL} from '../constants/strings';

export interface IChatUser {
  username: string;
  last_message: {
    message: string;
    time: number;
    is_myself: boolean;
  };
}

export const getChatUsers = async (): Promise<IChatUser[]> => {
  const response = await api.get<IChatUser[]>(`/chat_users`);
  return response.data;
};

interface Message {
  from: string;
  to: string;
  message: string;
}

export const getMessages = async (user: string): Promise<Message[]> => {
  const response = await api.get<Message[]>(`/get_chat/${user}`);
  return response.data;
};

export interface getChatResponse {
  username: string;
}

export const searchUsers = async (
  searchValue: string,
): Promise<getChatResponse[]> => {
  if (searchValue.trim().length === 0) return [];
  const validSearchValue = searchValue.trim().toLowerCase();
  const response = await api.get<getChatResponse[]>(
    `/chat_search/${validSearchValue}`,
  );
  return response.data;
};
