import { colors } from '@shared/consts/colors'
import { FC } from 'react'
import * as RN from 'react-native'

//secondary: boolean

interface Props extends RN.TextProps {
  bold?: boolean
  secondary?: boolean
  size?: number
  loading?: boolean
  link?: boolean
}

const Text: FC<Props> = ({
  size = 17,
  loading,
  bold,
  secondary,
  link,
  ...props
}) => {
  return (
    <RN.Text
      style={[
        s.default,
        {
          fontFamily: bold ? 'GolosBold' : 'Golos',
          fontSize: size,
        },
        link && s.link,
        secondary && s.secondary,
        loading && s.loading,
        props.style,
      ]}>
      {props.children}
    </RN.Text>
  )
}

const s = RN.StyleSheet.create({
  loading: {
    color: colors.EVENING,
  },
  secondary: {
    color: colors.GRAY,
  },
  default: {
    color: colors.WHITE,
  },
  link: {
    color: colors.DARK_LINK,
    textDecorationLine: 'underline',
  },
})

export default Text
