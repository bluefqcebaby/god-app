import { FC, useState } from 'react'
import { AxiosError } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as UI from '@shared/ui'
import { Controller, useForm } from 'react-hook-form'
import { IRegisterForm, registerSchema } from '@pages/auth/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthStore } from '@pages/auth/lib/use-auth-store'
import { useNavigation } from '@react-navigation/native'

export const SignUp = () => {
  const navigation = useNavigation()
  const authStore = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({ resolver: yupResolver(registerSchema) })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    setIsLoading(true)
    const result = await handleSubmit(authStore.register)
    setIsLoading(false)
    if (!result) {
      return
    }
    navigation.reset({ index: 0, routes: [{ name: 'tabs' as never }] })
  }

  return (
    <UI.Screen container>
      <UI.Spacer size={40} />
      <Controller
        control={control}
        name="username"
        render={({ field: { onBlur, onChange, value } }) => (
          <UI.TextInput
            helperText={errors.username?.message}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <UI.Spacer size={15} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onBlur, onChange, value } }) => (
          <UI.TextInput
            helperText={errors.password?.message}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <UI.Spacer size={15} />
      <Controller
        control={control}
        name="passwordRepeat"
        render={({ field: { onBlur, onChange, value } }) => (
          <UI.TextInput
            helperText={errors.passwordRepeat?.message}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <UI.Spacer size={15} />
      <UI.Button
        text={'Зарегистрироваться'}
        onPress={onSubmit}
        loading={isLoading}
      />
    </UI.Screen>
  )
}
