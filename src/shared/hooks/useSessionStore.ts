import { SessionStore, sessionStore } from '@shared/store/session-store'
import { createContext, useContext } from 'react'

const SessionStoreContext = createContext(sessionStore)

export const useSessionStore = () => useContext(SessionStoreContext)
