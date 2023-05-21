import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import React, { createContext } from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper'
import { Host } from 'react-native-portalize'
import Toast from 'react-native-toast-message'
import { colors } from './src/constants/styles'
import { showToast } from './src/lib/toast'
import { AuthStack } from './src/navigation/AuthStack'
import { TabsStack } from './src/navigation/TabStack'
import { PersonChat } from './src/screens/person-chat/person-chat'
import Splash from './src/screens/splash'
import { ChatStoreContext, counterStore } from './src/store/chat/chat'

export type RootProps = {
  Splash: undefined
  Tabs: undefined
  Auth: undefined
  ProfileChat: { id: string }
}

const RootStack = createNativeStackNavigator<RootProps>()

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      showToast('error', `Something went wrong: ${error.message}`)
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

function App() {
  return (
    <>
      <StatusBar style={'light'} />
      <PaperProvider theme={MD3DarkTheme}>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              background: 'red',
              primary: colors.DARK_BACKGROUND,
              card: colors.DARK_BACKGROUND,
              text: colors.WHITE,
              border: colors.DARK_BACKGROUND,
              notification: colors.DARK_BACKGROUND,
            },
          }}>
          <QueryClientProvider client={queryClient}>
            <Host>
              <RootStack.Navigator initialRouteName="Splash">
                <RootStack.Group
                  screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                  }}>
                  <RootStack.Screen name="Splash" component={Splash} />
                  <RootStack.Screen name="Auth" component={AuthStack} />
                  <RootStack.Screen name="Tabs" component={TabsStack} />
                </RootStack.Group>
                <RootStack.Screen name="ProfileChat" component={PersonChat} />
              </RootStack.Navigator>
            </Host>
          </QueryClientProvider>
        </NavigationContainer>
      </PaperProvider>
      <Toast />
    </>
  )
}

export default gestureHandlerRootHOC(App)
