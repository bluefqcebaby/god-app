import {FC, useState} from 'react';
import Screen from '../../components/screen';

import CustomButton from '../../components/custom-button';
import CustomTextInput from '../../components/custom-text-input';
import {useFormData} from '../../hooks/useFormData';
import {useMutation} from '@tanstack/react-query';
import {signIn, signUp} from '../../api/auth';
import {showToast} from '../../lib/toast';
import {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

export const SignUp: FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [formValues, handleFormValueChange] = useFormData({
    username: '',
    password: '',
    password_repeat: '',
  });
  const {isLoading, mutate} = useMutation(signUp, {
    onSuccess: async (data, variables, context) => {
      showToast('success', 'Перенаправляем на главный экран..');
      const token = await signIn(variables);
      await AsyncStorage.setItem('token', token);
      navigation.replace('Home');
    },
    onError: error => {
      const err = error as AxiosError;
      if (err.response?.status === 409) {
        showToast('error', 'Такой логин занят');
      } else {
        console.log(err.message);
        showToast('error', 'Никита даун');
      }
    },
  });
  console.log(isLoading);
  const onSubmit = async () => {
    const {username, password, password_repeat} = formValues;
    if (password.length < 5) {
      showToast('error', 'Пароль слишком короткий');
      return;
    }
    if (username.length < 6) {
      showToast('error', 'Ник слишком короткий');
      return;
    }
    if (password !== password_repeat) {
      showToast('error', 'Пароли не совпадают');
      return;
    }
    try {
      await mutate({username, password});
    } catch (e) {
      console.log('ERROR IN SIGN UP COMPONENT >>> ', e);
    }
    console.log(formValues);
  };
  return (
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
          onChangeText: text => handleFormValueChange('password', text),
        }}
      />
      <CustomTextInput
        label={'Пароль'}
        style={{marginBottom: 15}}
        props={{
          secureTextEntry: true,
          value: formValues.password,
          onChangeText: text => handleFormValueChange('password', text),
        }}
      />
      <CustomTextInput
        label={'Повтор пароля'}
        style={{marginBottom: 15}}
        props={{
          secureTextEntry: false,
          value: formValues.password_repeat,
          onChangeText: text => handleFormValueChange('password_repeat', text),
        }}
      />
      <CustomButton
        text={'Зарегистрироваться'}
        onPress={onSubmit}
        loading={isLoading}
      />
    </Screen>
  );
};
