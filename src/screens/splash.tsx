import {Image, StyleSheet, View} from 'react-native';
import {FC, useEffect, useRef} from 'react';
import {colors} from '../constants/styles';
import {timeout} from '../lib/helpers';
import {checkAuth} from '../api/auth';
import {Routes} from '../navigation/routes';
import {showToast} from '../lib/toast';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootProps} from '../../App';
import Screen from '../components/screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootProps, 'Splash'>;

const Splash: FC<Props> = ({navigation}) => {
  useEffect(() => {
    (async () => {
      const auth = await checkAuth();
      // const token = await AsyncStorage.getItem('token');
      await timeout(500);
      console.log(auth);
      if (auth === undefined) {
        showToast('info', 'Время действия токена истекло');
        navigation.replace('Auth');
        return;
      }
      await AsyncStorage.setItem('name', auth.data.username);
      navigation.replace('Tabs');
    })();
  }, []);
  return (
    <Screen style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../assets/new-splash.png')}
        style={{resizeMode: 'contain'}}
      />
    </Screen>
  );
};

export default Splash;
