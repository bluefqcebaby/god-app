import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Routes } from './routes'
import { colors } from '../constants/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from '../components/custom-text'

const Tab = createMaterialBottomTabNavigator()

export const tabs = [
  {
    name: 'chats',
    title: 'Чат',
    screen: ChatStack,
    type: 'chat-outline',
  },
]

export const TabsStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={tabs[0].name}
      backBehavior={'initialRoute'}
      activeColor={'#0582FF'}
      inactiveColor={'#AEAAAE'}
      barStyle={{
        backgroundColor: colors.ACCENT_DARK,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
      }}
      shifting>
      {tabs.map(elem => (
        <Tab.Screen
          key={elem.title}
          name={elem.name}
          component={elem.screen}
          options={{
            //@ts-expect-error
            tabBarLabel: <CustomText size={12}>{elem.title}</CustomText>,
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                color={focused ? colors.PRIMARY_BLUE : colors.GRAY}
                size={26}
                name={elem.type}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
