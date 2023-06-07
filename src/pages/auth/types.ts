import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup.string().required('Поле не должно быть пустым'),
  password: yup
    .string()
    .required(' Поле не должно быть пустым')
    .min(6, 'Пароль слишком короткий'),
})

export const registerSchema = loginSchema.shape({
  passwordRepeat: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
})
// passwordRepeat: yup
//   .string()
//   .required('Поле не должно быть пустым')
//   .oneOf([yup.ref('password')], 'Пароли должны совпадать'),

console.log(registerSchema)
console.log(loginSchema)

export interface IRegisterForm extends yup.InferType<typeof registerSchema> {}

export interface IUser extends yup.InferType<typeof loginSchema> {}

export interface ISignInResponse {
  access_token: string
}
