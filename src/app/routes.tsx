import { SignIn, SignUp } from '@pages/auth'
import SplashScreen from '@pages/splash-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as UI from '@shared/ui'
import { Text } from 'react-native'

const RootStack = createNativeStackNavigator()

export const Routes = () => {
  return (
    <RootStack.Navigator
      initialRouteName="sign-in"
      screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="asd"
        component={() => (
          <UI.Text
            style={{ color: 'red', fontSize: 30, backgroundColor: 'black' }}>
            ghbdtn
          </UI.Text>
        )}
      />
      <RootStack.Screen name="sign-in" component={SignIn} />
      <RootStack.Screen name="sign-up" component={SignUp} />
      <RootStack.Screen name="splash" component={SplashScreen} />
      {/* <RootStack.Screen name="tabs" component={TabsStack} /> */}
      {/* <RootStack.Screen name="person-chat" component={PersonChat} /> */}
    </RootStack.Navigator>
  )
}
