import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Routes } from './routes'
import { colors } from '../constants/styles'
import { tabs } from '../assets/data'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '../shared/ui/text'

const Tab = createMaterialBottomTabNavigator()

export const TabsStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.chat}
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
            //@ts-ignore
            tabBarLabel: <Text size={12}>{elem.title}</Text>,
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
