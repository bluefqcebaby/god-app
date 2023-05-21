import { FC } from 'react'
import { View } from 'react-native'
import CustomText from '../../../components/custom-text'
import { colors } from '../../../constants/styles'
import { format, parse } from 'date-fns'

interface Props {
  text: string
  isMyself: boolean
  time: Date
}

const myColor = colors.PRIMARY_BLUE
const companionColor = colors.ACCENT_DARK

export const Message: FC<Props> = ({ text, isMyself, time }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 7,
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: isMyself ? myColor : companionColor,
        borderRadius: 8,
        maxWidth: '80%',
        alignSelf: isMyself ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={{
          position: 'absolute',
          left: isMyself ? undefined : -5,
          right: isMyself ? -5 : undefined,
          bottom: 0,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderRightWidth: 30,
          borderTopWidth: 30,
          borderRightColor: 'transparent',
          borderTopColor: isMyself ? myColor : companionColor,
          transform: [{ rotate: isMyself ? '-90deg' : '180deg' }],
        }}
      />
      <CustomText>{text}</CustomText>
      <CustomText secondary size={12}>
        {format(time, 'HH:mm')}
      </CustomText>
    </View>
  )
}
