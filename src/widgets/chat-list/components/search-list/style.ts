import { colors } from '@shared/consts/colors'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  box: {
    paddingVertical: 15,
    paddingLeft: 24,
    backgroundColor: colors.ACCENT_DARK,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.BORDER,
  },
})
