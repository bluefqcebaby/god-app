import { FC } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import CustomText from '../../../components/custom-text'
import { colors } from '../../../constants/styles'
import { getTimeFromDate } from '../../../lib/helpers'
import { IUserChat } from 'src/store/chat/types'
import { observer } from 'mobx-react-lite'

interface Props {
  chat: IUserChat
  onPress: () => void
}

export const ChatCard: FC<Props> = observer(({ chat, onPress }) => {
  const { message, time, isMyself } = chat.lastMessage
  return (
    <Pressable style={styles.box} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomText bold size={20}>
          {chat.username}
        </CustomText>
        <CustomText>{getTimeFromDate(new Date(time))}</CustomText>
      </View>
      {isMyself && <CustomText secondary>ты</CustomText>}
      <View>
        <CustomText size={15} props={{ numberOfLines: 2 }}>
          {message}
        </CustomText>
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  box: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.ACCENT_DARK,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.BORDER,
  },
})
