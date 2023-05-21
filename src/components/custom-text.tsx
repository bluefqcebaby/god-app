import { Text, TextProps, TextStyle } from 'react-native'
import { colors } from '../constants/styles'
import { FC, ReactNode } from 'react'

//secondary: boolean

interface Props {
  bold?: boolean
  secondary?: boolean
  size?: number
  style?: TextStyle
  children: ReactNode
  loading?: boolean
  props?: TextProps
}

const customText: FC<Props> = ({
  size = 17,
  loading,
  style,
  children,
  bold,
  secondary,
  props,
}) => {
  return (
    <Text
      {...props}
      style={{
        fontFamily: bold ? 'Golos-Bold' : 'Golos-Regular',
        color: secondary
          ? colors.GRAY
          : loading
          ? colors.EVENING
          : colors.WHITE,
        fontSize: size,
        ...style,
      }}>
      {children}
    </Text>
  )
}
export default customText
