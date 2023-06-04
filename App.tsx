import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper'
import { Host } from 'react-native-portalize'
import Toast from 'react-native-toast-message'
import { useSubscribeAuthState } from '@shared/hooks/useSubscribeAuthState'
import { colors } from '@shared/consts/colors'
import { Routes } from 'src/app'
import * as RN from 'react-native'

function App() {
  // useSubscribeAuthState()
  console.log(123)
  return (
    <>
      <StatusBar style={'light'} />
      <NavigationContainer>
        <Host>
          <Routes />
        </Host>
      </NavigationContainer>
      <Toast />
    </>
  )
}

export default gestureHandlerRootHOC(App)
