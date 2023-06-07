import { FC } from 'react'
import * as RN from 'react-native'
import Text from './text'
import Loader from './loader'
import { colors } from '@shared/consts/colors'

type ButtonType = 'danger' | 'outlet'

interface Props extends RN.TouchableOpacityProps {
  text: string
  loading?: boolean
  danger?: boolean
  type?: ButtonType
  outlet?: boolean
}

const Button: FC<Props> = ({
  text,
  loading = false,
  outlet,
  danger,
  type,
  ...props
}) => {
  return (
    <RN.TouchableOpacity
      {...props}
      style={[
        s.button,
        type === 'danger' && s.buttonDanger,
        type === 'outlet' && s.buttonOutlet,
        props.style,
      ]}>
      {loading && <Loader style={s.loader} />}
      {!loading && (
        <Text bold style={[s.text, type === 'outlet' && s.outletText]}>
          {text}
        </Text>
      )}
    </RN.TouchableOpacity>
  )
}

const s = RN.StyleSheet.create({
  loader: {
    position: 'absolute',
  },
  text: {
    color: colors.WHITE,
  },
  outletText: {
    color: colors.DARK_LINK,
  },
  button: {
    borderRadius: 8,
    backgroundColor: colors.PRIMARY_BLUE,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonLoading: {
    backgroundColor: colors.MIDNIGHT,
  },
  buttonDanger: {
    backgroundColor: colors.RED,
  },
  buttonOutlet: {
    backgroundColor: 'transparent',
  },
})

export default Button
