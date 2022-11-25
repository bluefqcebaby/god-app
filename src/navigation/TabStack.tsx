import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Routes} from './routes';
import {colors} from '../constants/styles';
import {tabs} from '../assets/data';
import SvgIcon from '../components/SvgIcon';
import HomeIcon from '../assets/svg/home-icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../components/custom-text';

const Tab = createMaterialBottomTabNavigator();

export const TabsStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes._home}
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
          name={elem.path}
          component={elem.screen}
          options={{
            //@ts-ignore
            tabBarLabel: <CustomText size={12}>{elem.title}</CustomText>,
            tabBarIcon: ({focused}) => (
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
  );
};
