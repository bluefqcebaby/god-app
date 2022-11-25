import CustomModal from '../../../components/custom-modal';
import {FC, useState} from 'react';
import CustomText from '../../../components/custom-text';
import CustomButton from '../../../components/custom-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQueryClient} from '@tanstack/react-query';

interface Props {
  visible: boolean;
  onClose: () => void;
  onPress: () => void;
}

export const ConfirmModal: FC<Props> = ({visible, onClose, onPress}) => {
  return (
    <CustomModal open={visible} onClose={onClose}>
      <CustomText
        bold
        size={22}
        style={{
          textAlign: 'center',
          marginBottom: 16,
        }}>
        Подтверждение
      </CustomText>
      <CustomText
        secondary
        style={{
          textAlign: 'center',
          marginBottom: 24,
        }}>
        Вы уверены что хотите выйти из аккаунта?
      </CustomText>
      <CustomButton
        text="Выйти"
        onPress={onPress}
        isDelete
        style={{
          marginHorizontal: 24,
        }}
      />
      <CustomButton
        text="Отмена"
        outlet
        onPress={onClose}
        style={{
          marginTop: 10,
          marginHorizontal: 24,
        }}
      />
    </CustomModal>
  );
};
