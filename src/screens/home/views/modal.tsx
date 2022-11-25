import Screen from '../../../components/screen';
import CustomTextInput from '../../../components/custom-text-input';
import Divider from '../../../components/divider';
import CustomButton from '../../../components/custom-button';
import CustomModal from '../../../components/custom-modal';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addCard, handleError, updateCard} from '../../../api/cards';
import {FC, useState} from 'react';
import Toast from 'react-native-toast-message';
import {hideToast, showToast} from '../../../lib/toast';
import {timeout} from '../../../lib/helpers';
import {AxiosError} from 'axios';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const HomeModalize: FC<Props> = props => {
  const {visible, onClose} = props;
  const queryClient = useQueryClient();
  const [textValue, setTextValue] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const mutation = useMutation(addCard, {
    onSuccess: async () => {
      showToast('info', 'Обновляем');
      await queryClient.invalidateQueries(['cards']);
      await timeout(400);
      hideToast();
    },
    onError: e => {
      handleError(e);
    },
  });
  const onSubmit = async () => {
    setFormLoading(true);
    mutation.mutate({
      title: textValue,
      date: Date.now(),
      counter: 0,
    });
    setFormLoading(false);
    setTextValue('');
    onClose();
  };

  return (
    <CustomModal open={visible} onClose={onClose}>
      <Screen container>
        <CustomTextInput
          props={{onChangeText: setTextValue, value: textValue, maxLength: 30}}
          label={'Название считаемого'}
        />
        <Divider />
        <CustomButton
          text={'Добавить'}
          onPress={onSubmit}
          loading={formLoading}
        />
      </Screen>
    </CustomModal>
  );
};

export default HomeModalize;
