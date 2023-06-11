import { FC, useContext, useEffect, useRef } from 'react'
import { AxiosError } from 'axios'
import * as UI from '@shared/ui'
import { s } from './style'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSessionStore } from '@shared/hooks/useSessionStore'
import { checkAuth } from './api'
import { handleRequest } from '@shared/lib/handle-error'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { timeout } from '@shared/lib/timeout'

const SplashScreen: FC = () => {
  const sessionStore = useSessionStore()
  const navigation = useNavigation()

  const init = async () => {
    const [response, err] = await handleRequest(checkAuth())
    await timeout(500)

    if (err) {
      // show toast only if error not expected
      if (err.response?.status !== 401) {
        Toast.show({
          type: 'error',
          text1: 'Упс...',
          text2: 'Непредвиденная ошибка 😔',
        })
      }

      return navigation.reset({
        index: 0,
        routes: [{ name: 'sign-in' as never }],
      })
    }

    // todo: make more safer (react-native-keychain)
    const token = await AsyncStorage.getItem('token')
    const username = response?.data.username

    sessionStore.setJwtToken(token!)
    sessionStore.setUsername(username)
    sessionStore.setIsLogged(true)

    navigation.reset({
      index: 0,
      routes: [{ name: 'tabs' as never }],
    })
  }

  useEffect(() => {
    init()
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
