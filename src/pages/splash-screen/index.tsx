import { FC, useContext, useEffect, useRef } from 'react'
import { AxiosError } from 'axios'
import * as UI from '@shared/ui'
import { s } from './style'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { timeout } from '@shared/lib/timeout'
import { ErrorToast } from 'react-native-toast-message'
import { useSessionStore } from '@shared/hooks/useSessionStore'
import { checkAuth } from './api'
import { handleRequest } from '@shared/lib/handle-error'

const SplashScreen: FC = () => {
  const sessionStore = useSessionStore()
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      const [response, err] = await handleRequest(checkAuth())

      if (err) {
        return navigation.navigate({ name: 'sign-in' as never })
      }

      const username = response?.data.username

      // navigation.reset({ index: 0, routes: [{ name: 'tabs' as never }] })
      return navigation.reset({
        index: 0,
        routes: [{ name: 'sign-in' as never }],
      })
      console.log(e)

      return navigation.reset({
        index: 0,
        routes: [{ name: 'sign-in' as never }],
      })
    })()
  }, [])
  return (
    <UI.Screen style={s.container}>
      <Image
        source={require('@shared/assets/new-splash.png')}
        style={s.image}
      />
    </UI.Screen>
  )
}

export default SplashScreen
