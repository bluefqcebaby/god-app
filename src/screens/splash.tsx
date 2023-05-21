import { Image, StyleSheet, View } from 'react-native'
import { FC, useContext, useEffect, useRef } from 'react'
import { colors } from '../constants/styles'
import { timeout } from '../lib/helpers'
import { checkAuth } from '../api/auth'
import { Routes } from '../navigation/routes'
import { showToast } from '../lib/toast'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootProps } from '../../App'
import Screen from '../components/screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError } from 'axios'
import { useChatStore } from 'src/store/chat/chat'

type Props = NativeStackScreenProps<RootProps, 'Splash'>

const Splash: FC<Props> = ({ navigation }) => {
  const chatStore = useChatStore()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await checkAuth()

        if (!response) return showToast('error', 'Непредвиденная ошибка')

        await timeout(500)

        chatStore.setUsername(response.data.username)

        navigation.replace('Tabs')
      } catch (e) {
        const err = e as AxiosError

        if (err.response?.status === 401) {
          return navigation.replace('Auth')
        }

        console.log(JSON.stringify(err, null, 2))

        console.log('error in splash.tsx >>> ', err.code, err.response?.status)
      }
    })()
  }, [])
  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../assets/new-splash.png')}
        style={{ resizeMode: 'contain' }}
      />
    </Screen>
  )
}

export default Splash
