import { FC } from 'react'
import * as UI from '@shared/ui'
import { s } from './style'
import { View } from 'react-native'

interface Props {
  visible: boolean
  onClose: () => void
  onPress: () => void
}

export const ConfirmModal: FC<Props> = ({ visible, onClose, onPress }) => {
  return (
    <UI.Modal open={visible} onClose={onClose}>
      <View style={s.container}>
        <UI.Text bold size={22} style={s.centerText}>
          Подтверждение
        </UI.Text>
        <UI.Spacer size={16} />
        <UI.Text secondary style={s.centerText}>
          Вы уверены что хотите выйти из аккаунта?
        </UI.Text>
        <UI.Spacer size={24} />
        <UI.Button text="Выйти" onPress={onPress} danger />
        <UI.Spacer size={10} />
        <UI.Button text="Отмена" outlet onPress={onClose} />
      </View>
    </UI.Modal>
  )
}
