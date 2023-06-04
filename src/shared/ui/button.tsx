import { FC } from 'react'
import * as RN from 'react-native'
import Text from './text'
import Loader from './loader'
import { colors } from '@shared/consts/colors'

interface Props extends RN.PressableProps {
  text: string
  loading?: boolean
  danger?: boolean
  onPress: (args: any) => void
  outlet?: boolean
}

const Button: FC<Props> = ({
  text,
  loading,
  outlet,
  danger,
  onPress,
  ...props
}) => {
  const color = loading
    ? colors.MIDNIGHT
    : danger
    ? colors.RED
    : colors.PRIMARY_BLUE
  return (
    <RN.TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: outlet ? undefined : color,
        },
        s.button,
        props.style as RN.StyleProp<RN.ViewStyle>,
      ]}
      disabled={loading}>
      {loading && <Loader style={s.loader} />}
      <Text
        bold
        loading={loading}
        style={{ color: outlet ? colors.DARK_LINK : undefined }}>
        {text}
      </Text>
    </RN.TouchableOpacity>
  )
}

const s = RN.StyleSheet.create({
  loader: {
    position: 'absolute',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
})

export default Button
