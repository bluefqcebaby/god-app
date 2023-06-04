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

const SplashScreen: FC = () => {
  const sessionStore = useSessionStore()
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      try {
        console.log(1)

        const response = await checkAuth()

        console.log(2)

        const username = response?.data.username

        console.log(username)
        // sessionStore.setUsername(response.data.username)
        console.log(3)

        // navigation.reset({ index: 0, routes: [{ name: 'tabs' as never }] })
        return navigation.reset({
          index: 0,
          routes: [{ name: 'sign-in' as never }],
        })
      } catch (e) {
        console.log(e)
        const err = e as AxiosError

        console.log(err)

        return navigation.reset({
          index: 0,
          routes: [{ name: 'sign-in' as never }],
        })
      }
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
