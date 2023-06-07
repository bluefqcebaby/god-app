import { useState } from 'react'
import * as RN from 'react-native'
import * as UI from '@shared/ui'
import { Controller, useForm } from 'react-hook-form'
import { IRegisterForm, registerSchema } from '@pages/auth/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthStore } from '@pages/auth/lib/use-auth-store'
import { useNavigation } from '@react-navigation/native'
import LeftArrow from '@shared/assets/svg/left-arrow'
import { s } from './style'

export const SignUp = () => {
  const { reset, goBack } = useNavigation()
  const authStore = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({
    mode: 'onSubmit',
    resolver: yupResolver(registerSchema),
  })

  console.log(errors)

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    setIsLoading(true)
    const result = await handleSubmit(authStore.register)
    setIsLoading(false)
    if (!result) {
      return
    }
    reset({ index: 0, routes: [{ name: 'tabs' as never }] })
  }

  return (
    <UI.Screen container>
      <UI.Header
        left={
          <RN.TouchableOpacity onPress={goBack}>
            <LeftArrow />
          </RN.TouchableOpacity>
        }
        center={<UI.Text>Регистрация</UI.Text>}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="username"
        render={({ field: { onChange, value } }) => (
          <UI.TextInput
            helperText={errors.username?.message}
            error={!!errors.username?.message}
            onChangeText={onChange}
            label="Логин"
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <UI.TextInput
            helperText={errors.password?.message}
            error={!!errors.password?.message}
            label="Пароль"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="passwordRepeat"
        render={({ field: { onChange, value } }) => (
          <UI.TextInput
            helperText={errors.passwordRepeat?.message}
            error={!!errors.passwordRepeat?.message}
            label="Повтор пароля"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <UI.Button
        style={s.bootomContent}
        text={'Зарегистрироваться'}
        onPress={handleSubmit(authStore.register)}
        loading={isLoading}
      />
    </UI.Screen>
  )
}
