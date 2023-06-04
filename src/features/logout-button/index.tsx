import LeaveIcon from '@shared/assets/svg/leave-icon'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ConfirmModal } from './components/confirm-modal'
import useStore from '@'

export const LogoutButton = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const { user } = useStore()

  const openModal = () => setModalVisible(true)

  const closeModal = () => setModalVisible(true)

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        <LeaveIcon />
      </TouchableOpacity>
      <ConfirmModal
        onClose={closeModal}
        onPress={user.logout}
        visible={modalVisible}
      />
    </>
  )
}
