import {Modalize} from 'react-native-modalize';
import {colors} from '../constants/styles';
import {Platform, ScrollView, View} from 'react-native';
import {Portal} from 'react-native-portalize';
import {FC, ReactNode, useEffect, useRef} from 'react';

const CustomModal: FC<{
  open: boolean;
  children?: ReactNode;
  onClose: () => void;
}> = props => {
  const modal = useRef<Modalize>();
  useEffect(() => {
    if (props.open) {
      modal.current?.open();
    } else {
      modal.current?.close();
    }
  }, [props.open]);
  return (
    <Portal>
      <Modalize
        ref={modal}
        adjustToContentHeight
        threshold={60}
        modalStyle={{
          backgroundColor: colors.DARK_BACKGROUND,
        }}
        onClose={props.onClose}
        handlePosition={'outside'}
        disableScrollIfPossible={Platform.select({
          ios: true,
          android: false,
        })}>
        <View style={{paddingVertical: 32}}>{props.children}</View>
      </Modalize>
    </Portal>
  );
};

export default CustomModal;
