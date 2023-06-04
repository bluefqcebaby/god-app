import React, { FC, useState } from 'react'
import * as UI from '@shared/ui'
import { LogoutButton } from '@features/logout-button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Search from '@shared/assets/svg/search'
import Close from '@shared/assets/svg/icon-close'
import useStore from '@'
import { observer } from 'mobx-react-lite'
import LeaveIcon from '@shared/assets/svg/leave-icon'
import { View } from 'react-native'
import { s } from './style'

export const ChatHeader = observer(() => {
  const {
    chat: { isSearching, toggleIsSearching },
  } = useStore()

  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => setModalVisible(true)

  const closeModal = () => setModalVisible(true)

  const onLeavePress = () => {
    //todo
  }

  return (
    <>
      <UI.Header
        center={<UI.Text>Список чатов</UI.Text>}
        left={
          <TouchableOpacity onPress={openModal}>
            <LeaveIcon />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity onPress={toggleIsSearching}>
            {isSearching ? <Close /> : <Search />}
          </TouchableOpacity>
        }
      />
      <UI.Modal open={modalVisible} onClose={closeModal}>
        <View style={s.container}>
          <UI.Text bold size={22} style={s.centerText}>
            Подтверждение
          </UI.Text>
          <UI.Spacer size={16} />
          <UI.Text secondary style={s.centerText}>
            Вы уверены что хотите выйти из аккаунта?
          </UI.Text>
          <UI.Spacer size={24} />
          <UI.Button text="Выйти" onPress={onLeavePress} danger />
          <UI.Spacer size={10} />
          <UI.Button text="Отмена" outlet onPress={closeModal} />
        </View>
      </UI.Modal>
    </>
  )
})
