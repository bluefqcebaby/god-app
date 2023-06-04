import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from '../constants/styles'
import Text from '../shared/ui/text'
import HomeComponent from '../screens/home/home'
import { Routes } from './routes'
import { View } from 'react-native'

export type HomeProps = {
  Home: undefined
}

const Home = createNativeStackNavigator<HomeProps>()

export const HomeStack = () => {
  return (
    <Home.Navigator initialRouteName={'Home'}>
      <Home.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.DARK_BACKGROUND,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Golos-Regular',
          },
        }}>
        <Home.Screen
          name={'Home'}
          component={HomeComponent}
          options={{
            title: 'Лист',
            headerBackVisible: false,
          }}
        />
      </Home.Group>
    </Home.Navigator>
  )
}
