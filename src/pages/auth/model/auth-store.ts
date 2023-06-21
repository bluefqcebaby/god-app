import { SessionStore, sessionStore } from '@shared/store/session-store'
import { makeAutoObservable, runInAction } from 'mobx'
import { IRegisterForm, ISignInResponseErr, IUser } from '../types'
import { signIn } from '@shared/api/auth'
import { authApi } from '../api'
import { handleRequest } from '@shared/lib/handle-request'
import Toast from 'react-native-toast-message'
import { responseMapper } from '../const'

class AuthStore {
  constructor(private session: SessionStore) {
    makeAutoObservable(this)
  }

  async login(data: IUser) {
    const [response, err] = await handleRequest(authApi.signIn(data))
    if (err) {
      console.log(err.response?.data)
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2:
          responseMapper[(err.response?.data as ISignInResponseErr).message],
      })
      return
    }
    // this.session.setJwtToken(response.access_token)
  }

  async register(data: IRegisterForm) {
    try {
      const { username, password } = data
      await authApi.signUp({ username, password })
      const response = await authApi.signIn({ username, password })
      this.session.setJwtToken(response.access_token)
      return true
    } catch (e) {
      return false
    }
  }
}

export const authStore = new AuthStore(sessionStore)

// const { isLoading, mutate } = useMutation(signIn, {
//   onSuccess: async token => {
//     await AsyncStorage.setItem('token', token)
//     navigation.replace('Tabs' as never)
//   },
//   onError: e => {
//     const err = e as AxiosError
//     if (err.response?.status === 401) {
//       showToast('error', 'Неправильный пароль')
//       return
//     }
//     if (err.response?.status === 404) {
//       showToast('error', 'Сервак выключен')
//       return
//     }
//     showToast('info', `Никита даун (${err.response?.status})`)
//   },
// })
// useEffect(() => {
//   ;(async () => {
//     const token = await messaging().getToken()
//     console.log('FCM TOKEN: ', token)
//   })()
// }, [])
// useEffect(() => {
//   return messaging().onMessage(async remoteMessage => {
//     Alert.alert(
//       `${remoteMessage.notification?.title} : ${remoteMessage.notification?.body}`,
//     )
//   })
// }, [])
// const onLoginPress = (values: typeof formValues) => {
//   const { username, password } = values
//   values.username = username.trim()
//   values.password = password.trim()
//   mutate(values)
// }