import { FC, useEffect, useState } from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema, IUser } from '../../types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as UI from '@shared/ui'
import { useAuthStore } from '@pages/auth/lib/use-auth-store'
import { s } from './styles'
import { Portal } from 'react-native-paper'

const defaultValues: IUser = {
  username: '',
  password: '',
}

export const SignIn: FC = () => {
  console.log(123)

  const navigation = useNavigation()
  const authStore = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<IUser>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  const [open, setIsOpen] = useState(true)

  const handleSignUpRedirect = () => navigation.navigate('sign-up' as never)
  return (
    <>
      <UI.Screen container safe>
        <UI.Header center={<UI.Text bold>Вход</UI.Text>} safeBlock={false} />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <UI.TextInput
              label="Логин"
              onChangeText={onChange}
              value={value}
              error={!!errors.username?.message}
              helperText={errors.username?.message}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <UI.TextInput
              label="Пароль"
              onChangeText={onChange}
              value={value}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
          name="password"
        />
        <TouchableOpacity onPress={handleSignUpRedirect}>
          <UI.Text link>Регистрация</UI.Text>
        </TouchableOpacity>
        <UI.Button
          style={s.submitButton}
          text="Войти"
          onPress={handleSubmit(authStore.login)}
        />
      </UI.Screen>
    </>
  )
}
