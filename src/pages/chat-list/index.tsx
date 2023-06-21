import Screen from 'src/shared/ui/screen'
import { FlatList, Keyboard, TouchableOpacity } from 'react-native'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchUsers } from '../../api/chat'
import Loader from '../../shared/ui/loader'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import TextInput from '../../shared/ui/text-input'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useDebounce } from 'use-debounce'
import * as UI from 'src/shared/ui'
import Text from '../../shared/ui/text'
import { observer } from 'mobx-react-lite'

const initialValue = -60

const Chat = () => {
  const [searchValue, setSearchValue] = useState('')

  const [leaveModal, setLeaveModal] = useState(false)

  const [isSearching, setIsSearching] = useState(false)

  const [debouncedValue] = useDebounce(searchValue, 500)

  const chatStore = useChatStore()

  const { data: searchData, isLoading: isSearchLoading } = useQuery(
    [keys.search, debouncedValue],
    () => searchUsers(debouncedValue),
  )

  const transformValue = useSharedValue(initialValue)

  const onPress = () => {
    const { value } = transformValue

    //if we need to show search bar
    if (value === initialValue) {
      transformValue.value = withTiming(0, {
        easing: Easing.ease,
        duration: 150,
      })

      inputRef.current?.focus()
    } else {
      transformValue.value = withTiming(initialValue, {
        easing: Easing.ease,
        duration: 150,
      })

      setIsSearching(false)

      Keyboard.dismiss()
    }
  }

  const animStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: transformValue.value }],
  }))

  const animList = useAnimatedStyle(() => ({
    transform: [{ translateY: transformValue.value }],
  }))

  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    chatStore.startSocket()
    return chatStore.closeSocket
  }, [])

  return (
    <Screen>
      <UI.Header
        left={}
        center={
          <Text bold size={20}>
            2 3 5
          </Text>
        }
        right={}
      />
      <Animated.View style={[{ marginHorizontal: 24 }, animStyles]}>
        <TextInput
          label="Поиск по людям"
          ref={inputRef}
          props={{
            value: searchValue,
            onChangeText: setSearchValue,
            onFocus: () => setIsSearching(true),
          }}
        />
        {isSearchLoading && (
          <Loader
            size={'small'}
            style={{ position: 'absolute', right: 10, top: 5, bottom: 0 }}
          />
        )}
      </Animated.View>
      <Animated.View style={[animList]}>
        {isSearching ? (
          <Animated.FlatList
            data={searchData}
            renderItem={({ item }) => (
              <SearchCard
                name={item.username}
                onPress={() =>
                  navigation.navigate('ProfileChat', {
                    id: item.username,
                  })
                }
              />
            )}
            keyExtractor={item => item.username}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 100,
            }}
          />
        ) : (
          <>
            {chatStore.chats.length !== 0 ? (
              <Animated.FlatList
                data={chatStore.chats
                  .slice()
                  .sort(
                    (a, b) =>
                      b.lastMessage.time.getMilliseconds() -
                      a.lastMessage.time.getMilliseconds(),
                  )}
                renderItem={({ item, index }) => (
                  <ChatCard
                    idx={index}
                    chat={item}
                    onPress={() =>
                      navigation.navigate('ProfileChat', {
                        id: item.username,
                      })
                    }
                  />
                )}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                keyExtractor={item => item.username}
              />
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                У вас нет чатов, поищите кого-нибудь
              </Text>
            )}
          </>
        )}
      </Animated.View>
      <ConfirmModal
        visible={leaveModal}
        onClose={() => setLeaveModal(false)}
        onPress={chatStore.clear}
      />
    </Screen>
  )
}

// const ChatList = ({ chats }: { chats: IUserChat[] }) => {
//   const navigation = useNavigation()
//   return chats.length !== 0 ? (
//     <FlatList
//       data={chats}
//       renderItem={({ item }) => (
//         <ChatCard
//           chat={item}
//           onPress={() =>
//             //@ts-expect-error
//             navigation.navigate('ProfileChat', {
//               id: item.username,
//             })
//           }
//         />
//       )}
//       contentContainerStyle={{ paddingHorizontal: 24 }}
//       keyExtractor={item => item.username}
//     />
//   ) : (
//     <CustomText style={{ textAlign: 'center', marginTop: 20 }}>
//       У вас нет чатов, поищите кого-нибудь
//     </CustomText>
//   )
// })

export default observer(Chat)
