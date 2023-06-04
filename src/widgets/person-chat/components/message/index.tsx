import { FC } from 'react'
import { View } from 'react-native'
import * as UI from '@shared/ui'
import { format } from 'date-fns'
import Animated, { BounceInRight } from 'react-native-reanimated'
import { s } from './style'
import { colors } from '@shared/consts/colors'

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
      style={[
        s.messageContainer,
        {
          backgroundColor: isMyself ? myColor : companionColor,
          alignSelf: isMyself ? 'flex-end' : 'flex-start',
        },
      ]}>
      <View
        style={[
          s.message,
          {
            left: isMyself ? undefined : -5,
            right: isMyself ? -5 : undefined,
            borderTopColor: isMyself ? myColor : companionColor,
            transform: [{ rotate: isMyself ? '-90deg' : '180deg' }],
          },
        ]}
      />
      <UI.Text>{text}</UI.Text>
      <UI.Text secondary size={12}>
        {format(time, 'HH:mm')}
      </UI.Text>
    </View>
  )
}
