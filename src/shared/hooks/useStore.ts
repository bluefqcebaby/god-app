import { AppStore } from '@shared/store/app-store'
import { createContext, useContext } from 'react'

const appStore = new AppStore()

const storeContext = createContext<AppStore>(appStore)

export const useStore = () => useContext(storeContext)
