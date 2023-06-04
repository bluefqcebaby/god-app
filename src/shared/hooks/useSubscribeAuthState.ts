import { sessionStore } from '@shared/store/session-store'
import { autorun } from 'mobx'
import { useEffect } from 'react'

export const useSubscribeAuthState = () => {
  useEffect(
    () =>
      autorun(() => {
        if (sessionStore.isLogged) {
          sessionStore.triggerSubs('login')
          return
        }

        sessionStore.triggerSubs('logout')
      }),
    [],
  )
}
