import CustomModal from '../../../components/custom-modal';
import {FC, useState} from 'react';
import Screen from '../../../components/screen';
import CustomText from '../../../components/custom-text';
import CustomButton from '../../../components/custom-button';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteCard, ICard} from '../../../api/cards';
import {hideToast, showToast} from '../../../lib/toast';
import {timeout} from '../../../lib/helpers';
import {AxiosError} from 'axios';
import Card from './card';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: String;
  id: String;
}

const DeleteModal: FC<Props> = props => {
  const {visible, onClose, title, id} = props;
  const queryClient = useQueryClient();
  const [buttonLoading, setButtonLoading] = useState(false);
  const mutation = useMutation(deleteCard, {
    onMutate: async () => {
      const oldData = queryClient.getQueryData<ICard[]>(['cards']);
      queryClient.setQueryData<ICard[]>(
        ['cards'],
        oldData => oldData && oldData.filter(elem => elem.id !== id),
      );
      return oldData;
    },
    onError: (e, _, context) => {
      const err = e as AxiosError;
      queryClient.setQueryData<ICard[]>(['cards'], context);
      showToast('error', `${err.message}`);
    },
  });
  const pressHandler = async () => {
    setButtonLoading(true);
    await mutation.mutate(id);
    setButtonLoading(false);
    onClose();
  };
  return (
    <CustomModal open={visible} onClose={onClose}>
      <Screen container>
        <CustomText style={{marginBottom: 10}}>
          Точно удалить карточку <CustomText bold>{title}</CustomText>?
        </CustomText>
        <CustomButton text="Удалить" isDelete onPress={pressHandler} />
      </Screen>
    </CustomModal>
  );
};

export default DeleteModal;
