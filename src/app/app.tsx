import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper'
import { Host } from 'react-native-portalize'
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastConfig,
} from 'react-native-toast-message'
import { Routes } from './routes'
import { useSubscribeAuthState } from '@shared/hooks/useSubscribeAuthState'

const toastConfig: ToastConfig = {
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
        color: 'black',
      }}
      text2Style={{
        fontSize: 14,
        color: 'black',
      }}
    />
  ),
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 15,
        color: 'black',
      }}
      text2Style={{
        fontSize: 14,
        color: 'black',
      }}
    />
  ),
  info: props => (
    <InfoToast
      {...props}
      text1Style={{
        fontSize: 15,
        color: 'black',
      }}
      text2Style={{
        fontSize: 14,
        color: 'black',
      }}
    />
  ),
}
function App() {
  useSubscribeAuthState()
  return (
    <>
      <StatusBar style={'light'} />
      <NavigationContainer>
        <Host>
          <Routes />
        </Host>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  )
}

export default gestureHandlerRootHOC(App)
