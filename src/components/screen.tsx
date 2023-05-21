import { Pressable, View, ViewStyle } from 'react-native'
import { colors } from '../constants/styles'
import { FC, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Screen {
  children: ReactNode
  style?: ViewStyle
  container?: boolean
  safe?: boolean
  pressable?: boolean
  onPress?: () => void
}

const Screen: FC<Screen> = ({
  children,
  style,
  container,
  pressable = false,
  safe = false,
  onPress,
}) => {
  // children = <SafeAreaView>{children}</SafeAreaView>;
  const Container = safe ? SafeAreaView : pressable ? Pressable : View
  return (
    <Container
      onPress={onPress}
      style={{
        paddingHorizontal: container ? 24 : 0,
        backgroundColor: colors.DARK_BACKGROUND,
        flex: 1,
        ...style,
      }}>
      {children}
    </Container>
  )
}

export default Screen
