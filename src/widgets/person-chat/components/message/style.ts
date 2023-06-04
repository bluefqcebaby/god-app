import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  message: {
    bottom: 0,
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 30,
    borderTopWidth: 30,
    borderRightColor: 'transparent',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 7,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    maxWidth: '80%',
  },
})
