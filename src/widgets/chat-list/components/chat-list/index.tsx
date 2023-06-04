import useStore from '@'
import { observer } from 'mobx-react-lite'
import Animated, { BounceInRight } from 'react-native-reanimated'
import * as UI from '@shared/ui'
import { Pressable, View } from 'react-native'
import { s } from './style'
import { useNavigation } from '@react-navigation/native'
import { getTimeFromDate } from '@widgets/chat-list/lib/get-time-from-date'

export const ChatList = observer(() => {
  const {
    chat: { chatIds },
  } = useStore()

  return (
    <Animated.FlatList
      data={chatIds}
      keyExtractor={item => item}
      ItemSeparatorComponent={() => <UI.Spacer size={8} />}
      renderItem={({ item, index }) => <ChatCard idx={index} username={item} />}
      contentContainerStyle={{ paddingHorizontal: 24 }}
    />
  )
})

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const ChatCard = observer(({ username, idx }) => {
  const { chat: chatStore } = useStore()

  const chat = chatStore.chats.get(username)!

  const navigation = useNavigation()

  const handleDialogueRedirect = () => {
    //@ts-expect-error
    navigation.navigate('person-chat', { id: username })
  }

  const date = getTimeFromDate(new Date(chat.time))

  return (
    <AnimatedPressable
      style={s.box}
      onPress={handleDialogueRedirect}
      entering={BounceInRight.delay(idx * 100)}>
      <View style={s.container}>
        <UI.Text bold size={20}>
          {username}
        </UI.Text>
        <UI.Text>{date}</UI.Text>
      </View>
      {chat.isMyself && <UI.Text secondary>ты</UI.Text>}
      <View>
        <UI.Text size={15} props={{ numberOfLines: 2 }}>
          {chat.message}
        </UI.Text>
      </View>
    </AnimatedPressable>
  )
})
