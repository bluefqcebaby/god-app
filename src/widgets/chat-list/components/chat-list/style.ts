import { StyleSheet } from 'react-native'
import { colors } from '@shared/consts/colors'

export const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.ACCENT_DARK,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.BORDER,
  },
})
