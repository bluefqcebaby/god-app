import Screen from '@components/screen'
import { FlatList, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { keys } from '../../constants/strings'
import { SearchCard } from './views/search-card'
import { useQuery } from '@tanstack/react-query'
import { searchUsers } from '../../api/chat'
import Loader from '../../components/loader'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootProps } from '../../../App'
import Search from '../../assets/svg/search'
import CustomTextInput from '../../components/custom-text-input'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useDebounce } from 'use-debounce'
import { ChatCard } from './views/chat-card'
import Close from '../../assets/svg/icon-close'
import { IUserChat } from '../../store/chat/types'
import { useNavigation } from '@react-navigation/native'
import * as UI from '@components'
import CustomText from '../../components/custom-text'
import { observer } from 'mobx-react-lite'
import { useChatStore } from 'src/store/chat/chat'

type Props = NativeStackScreenProps<RootProps>

const initialValue = -60

const Chat: FC<Props> = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('')

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
        center={
          <CustomText bold size={20}>
            2 3 5
          </CustomText>
        }
        right={
          <TouchableOpacity onPress={onPress}>
            {isSearching ? <Close /> : <Search />}
          </TouchableOpacity>
        }
      />
      <Animated.View style={[{ marginHorizontal: 24 }, animStyles]}>
        <CustomTextInput
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
          <FlatList
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
              <FlatList
                data={chatStore.chats
                  .slice()
                  .sort(
                    (a, b) =>
                      b.lastMessage.time.getMilliseconds() -
                      a.lastMessage.time.getMilliseconds(),
                  )}
                renderItem={({ item }) => (
                  <ChatCard
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
              <CustomText style={{ textAlign: 'center', marginTop: 20 }}>
                У вас нет чатов, поищите кого-нибудь
              </CustomText>
            )}
          </>
        )}
      </Animated.View>
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
