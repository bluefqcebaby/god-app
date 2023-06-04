import { createContext, useContext } from 'react'
import { authStore } from '../model/auth-store'

const AuthStoreContext = createContext(authStore)

export const useAuthStore = () => useContext(AuthStoreContext)
