import { Pressable, StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import { FC, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@shared/consts/colors'

interface ScreenProps extends ViewProps {
  children: ReactNode
  container?: boolean
  safe?: boolean
  pressable?: boolean
  onPress?: () => void
}

const Screen: FC<ScreenProps> = ({
  children,
  container,
  pressable = false,
  safe = false,
  onPress,
  ...props
}) => {
  console.log('contrainer')
  const Container = safe ? SafeAreaView : pressable ? Pressable : View
  return (
    <Container
      {...props}
      onPress={onPress}
      style={[
        s.screen,
        {
          paddingHorizontal: container ? 24 : 0,
        },
        props.style,
      ]}>
      {children}
    </Container>
  )
}

const s = StyleSheet.create({
  screen: {
    backgroundColor: colors.DARK_BACKGROUND,
    flex: 1,
  },
})

export default Screen
