import { api } from '.'

export interface getChatResponse {
  username: string
}

export const searchUsers = async (searchValue: string) => {
  if (searchValue.trim().length === 0) return []
  const validSearchValue = searchValue.trim().toLowerCase()
  const response = await api.get<getChatResponse[]>(
    `/chat_search/${validSearchValue}`,
  )
  return response.data
}
