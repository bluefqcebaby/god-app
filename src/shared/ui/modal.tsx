import { Modalize } from 'react-native-modalize'
import { Platform, View } from 'react-native'
import { Portal } from 'react-native-portalize'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { colors } from '@shared/consts/colors'

interface Props {
  open: boolean
  children: ReactNode
  onClose: () => void
}

const Modal: FC<Props> = ({ onClose, open, children }) => {
  const modal = useRef<Modalize>()

  const disabledScroll = Platform.select({
    ios: true,
    android: false,
  })

  useEffect(() => {
    if (open) {
      modal.current?.open()
      return
    }

    modal.current?.close()
  }, [open])

  return (
    <Portal>
      <Modalize
        ref={modal}
        adjustToContentHeight
        threshold={60}
        modalStyle={{
          backgroundColor: colors.DARK_BACKGROUND,
        }}
        onClose={onClose}
        handlePosition={'outside'}
        disableScrollIfPossible={disabledScroll}>
        <View style={{ paddingVertical: 32 }}>{children}</View>
      </Modalize>
    </Portal>
  )
}

export default Modal
