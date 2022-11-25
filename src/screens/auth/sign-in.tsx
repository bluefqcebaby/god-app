import {FC, useEffect} from 'react';
import Screen from '../../components/screen';

import CustomButton from '../../components/custom-button';
import CustomTextInput from '../../components/custom-text-input';
import CustomText from '../../components/custom-text';
import {Alert, Pressable} from 'react-native';
import {useFormData} from '../../hooks/useFormData';
import {useMutation} from '@tanstack/react-query';
import {signIn} from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {hideToast, showToast} from '../../lib/toast';
import {AxiosError} from 'axios';
import messaging from '@react-native-firebase/messaging';
import {Routes} from '../../navigation/routes';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootProps} from '../../../App';
import {AuthProps} from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthProps>;

export const SignIn: FC<Props> = ({navigation}) => {
  const onSignUpPress = () => navigation.navigate('SignUp');
  const [formValues, handleFormChange] = useFormData({
    username: '',
    password: '',
  });
  const {isLoading, mutate} = useMutation(signIn, {
    onSuccess: async (data, variables) => {
      await AsyncStorage.setItem('token', data);
      // @ts-ignore
      navigation.replace('Tabs');
    },
    onError: e => {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        showToast('error', 'Неправильный пароль');
        return;
      }
      if (err.response?.status === 404) {
        showToast('error', 'Сервак выключен');
        return;
      }
      showToast('info', `Никита даун (${err.response?.status})`);
    },
  });
  useEffect(() => {
    (async () => {
      const token = await messaging().getToken();
      console.log('FCM TOKEN: ', token);
    })();
  }, []);
  useEffect(() => {
    return messaging().onMessage(async remoteMessage => {
      Alert.alert(
        `${remoteMessage.notification?.title} : ${remoteMessage.notification?.body}`,
      );
    });
  }, []);
  return (
    <>
      <Screen
        container
        style={{
          paddingTop: 40,
        }}>
        <CustomTextInput
          label={'Логин'}
          style={{marginBottom: 15}}
          props={{
            value: formValues.username,
            onChangeText: text => handleFormChange('username', text),
          }}
        />
        <CustomTextInput
          label={'Пароль'}
          style={{marginBottom: 15}}
          props={{
            value: formValues.password,
            onChangeText: text => handleFormChange('password', text),
            secureTextEntry: true,
          }}
        />
        <CustomButton
          text={'Войти'}
          loading={isLoading}
          onPress={() => mutate(formValues)}
        />
        <Pressable onPress={onSignUpPress}>
          <CustomText secondary style={{textAlign: 'center', marginTop: 15}}>
            Нет аккаунта? Зарегистрируйся!💩
          </CustomText>
        </Pressable>
      </Screen>
    </>
  );
};
