import { ChatStore } from '@entities/chat-list'
import { SessionStore } from '@shared/store/session-store'
import { createContext, useContext } from 'react'

export class AppStore {
  chat = new ChatStore(this)
  user = new SessionStore(this)
}

const appStore = new AppStore()

const appStoreContext = createContext(appStore)

const useStore = () => useContext(appStoreContext)

export default useStore
