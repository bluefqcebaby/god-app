import Screen from '../../components/screen'
import { FC, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import PlusIcon from '../../assets/svg/plus-icon-add'
import Text from '../../components/custom-text'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCards } from '../../api/cards'
import Loader from '../../components/loader'
import Card from './views/card'
import HomeModalize from './views/modal'
import LeaveIcon from '../../assets/svg/leave-icon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { keys } from '../../constants/strings'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootProps } from '../../../App'
import { useGlobalSocket } from '../../hooks/useGlobalSocket'
import { ConfirmModal } from './views/confirmModal'
import Animated, { FadeIn } from 'react-native-reanimated'

type Props = NativeStackScreenProps<RootProps, 'Tabs'>

const Home: FC<Props> = ({ navigation }) => {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery([keys.cards], getCards)

  const [modalVisible, setModalVisible] = useState(false)

  const [leaveModal, setLeaveModal] = useState(false)

  const onLeave = async () => {
    await AsyncStorage.setItem('token', '')
    queryClient.clear()
    // socket.close();
    navigation.replace('Auth')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <PlusIcon />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => setLeaveModal(true)}>
          <LeaveIcon />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  let condition = false

  if (data) {
    condition = data.length > 0
  }

  return (
    <>
      <Screen
        style={{
          justifyContent: 'center',
          alignItems: condition ? 'stretch' : 'center',
        }}>
        {isLoading ? (
          <Loader />
        ) : condition ? (
          <>
            <Animated.FlatList
              data={data}
              renderItem={({ item, index }) => (
                <Card
                  date={item.date}
                  title={item.title}
                  counter={item.counter}
                  id={item.id}
                  index={index}
                />
              )}
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: 24,
              }}
            />
          </>
        ) : (
          <Text secondary>Ты еще не добавил никаких карточек</Text>
        )}
      </Screen>
      <HomeModalize
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <ConfirmModal
        visible={leaveModal}
        onClose={() => setLeaveModal(false)}
        onPress={onLeave}
      />
    </>
  )
}

export default Home
