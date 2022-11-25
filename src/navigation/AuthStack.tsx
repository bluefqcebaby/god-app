import {SignIn} from '../screens/auth/sign-in';
import {SignUp} from '../screens/auth/sign-up';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './routes';
import React from 'react';
import {colors} from '../constants/styles';

export type AuthProps = {
  SignIn: undefined;
  SignUp: undefined;
};

const Auth = createNativeStackNavigator<AuthProps>();

export const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName={'SignIn'}>
      <Auth.Screen
        name={'SignIn'}
        component={SignIn}
        options={{
          title: 'Вход',
          headerBackVisible: false,
          headerStyle: {backgroundColor: colors.DARK_BACKGROUND},
        }}
      />
      <Auth.Screen
        name={'SignUp'}
        component={SignUp}
        options={{
          title: 'Регистрация',
          headerBackVisible: true,
          headerStyle: {backgroundColor: colors.DARK_BACKGROUND},
        }}
      />
    </Auth.Navigator>
  );
};
