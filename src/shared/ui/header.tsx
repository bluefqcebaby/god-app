import { colors } from '@shared/consts/colors'
import { FC, ReactNode } from 'react'
import * as RN from 'react-native'
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
      {safeBlock && <RN.View style={[styles.safeBlock, { height: top }]} />}
      <RN.View style={[styles.wrapper]}>
        <RN.View style={styles.left}>{left}</RN.View>
        <RN.View>{center}</RN.View>
        <RN.View style={styles.right}>{right}</RN.View>
      </RN.View>
    </>
  )
}

const styles = RN.StyleSheet.create({
  left: {
    position: 'absolute',
    left: 0,
  },
  safeBlock: {
    zIndex: 99,
    backgroundColor: colors.DARK_BACKGROUND,
  },
  right: {
    position: 'absolute',
    right: 0,
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
