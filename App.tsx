import {StatusBar} from 'expo-status-bar';
import {colors} from './src/constants/styles';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/splash';
import Home from './src/screens/home/home';
import {Host} from 'react-native-portalize';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {showToast} from './src/lib/toast';
import CustomText from './src/components/custom-text';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthStack} from './src/navigation/AuthStack';
import {Routes} from './src/navigation/routes';
import {TabsStack} from './src/navigation/TabStack';
import React, {createContext, useState} from 'react';
import {PersonChat} from './src/screens/person-chat/person-chat';
import {useGlobalSocket} from './src/hooks/useGlobalSocket';
import {isWeb} from 'react-native-modalize/lib/utils/devices';

export type RootProps = {
  Splash: undefined;
  Tabs: undefined;
  Auth: undefined;
  ProfileChat: {id: string};
};

export const Context = createContext<{
  socket?: WebSocket;
  setSocket?: (socket: any) => {};
}>({});

const RootStack = createNativeStackNavigator<RootProps>();
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      showToast('error', `Something went wrong: ${error.message}`);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  return (
    <>
      <StatusBar style={'light'} />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            background: colors.DARK_BACKGROUND,
            primary: colors.DARK_BACKGROUND,
            card: colors.DARK_BACKGROUND,
            text: colors.WHITE,
            border: colors.DARK_BACKGROUND,
            notification: colors.DARK_BACKGROUND,
          },
        }}>
        <QueryClientProvider client={queryClient}>
          <Host>
            <Context.Provider
              //@ts-ignore
              value={{socket, setSocket}}>
              <RootStack.Navigator initialRouteName="Splash">
                <RootStack.Group screenOptions={{headerShown: false}}>
                  <RootStack.Screen name="Splash" component={Splash} />
                  <RootStack.Screen name="Auth" component={AuthStack} />
                  <RootStack.Screen name="Tabs" component={TabsStack} />
                </RootStack.Group>
                <RootStack.Screen name="ProfileChat" component={PersonChat} />
              </RootStack.Navigator>
            </Context.Provider>
          </Host>
        </QueryClientProvider>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default gestureHandlerRootHOC(App);
