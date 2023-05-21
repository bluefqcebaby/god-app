import { FC, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../constants/styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
  safeBlock?: boolean
}

const Header: FC<Props> = ({ left, center, right, safeBlock = true }) => {
  const { top } = useSafeAreaInsets()
  return (
    <>
      {safeBlock && <View style={[styles.safeBlock, { height: top }]} />}
      <View style={[styles.wrapper, { height: 50 }]}>
        <View>{center}</View>
        <View style={styles.right}>{right}</View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  safeBlock: {
    zIndex: 99,
    backgroundColor: colors.DARK_BACKGROUND,
  },
  right: {
    position: 'absolute',
    right: 20,
  },
  wrapper: {
    zIndex: 99,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DARK_BACKGROUND,
  },
})

export default Header
