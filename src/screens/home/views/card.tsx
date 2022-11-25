import {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from '../../../components/custom-text';
import {colors} from '../../../constants/styles';
import PlusIcon from '../../../assets/svg/plus-icon';
import MinusIcon from '../../../assets/svg/minus-icon';
import {
  formatDateStringWithTodayYesterday,
  getTimeFromDate,
  timeout,
} from '../../../lib/helpers';
import DeleteModal from './deleteModal';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {handleError, ICard, updateCard} from '../../../api/cards';
import {showToast} from '../../../lib/toast';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  date: number;
  title: string;
  counter: number;
  id: string;
  index: number;
}

const Card: FC<Props> = ({title, date, counter, id, index}) => {
  const queryClient = useQueryClient();
  const opacityValue = useSharedValue(0);
  const translateValue = useSharedValue(100);
  const [deleteModal, setDeleteModal] = useState(false);
  const [card, setCard] = useState<ICard>({title, date, counter, id});
  const [loading, setLoading] = useState(false);
  const mutationUpdate = useMutation(updateCard, {
    onError: e => {
      handleError(e);
    },
    onMutate: variables => {
      const {date, counter} = variables;
      setLoading(true);
      setCard(prev => ({...prev, date, counter}));
    },
    onSettled: () => {
      setLoading(false);
    },
  });
  const onPress = async (number: number) => {
    if (number < 0) {
      showToast('error', 'Отрицательное число');
      return;
    }
    await mutationUpdate.mutateAsync({
      title,
      date: Date.now(),
      id,
      counter: number,
    });
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
      transform: [{translateX: translateValue.value}],
    };
  });
  useEffect(() => {
    (async () => {
      await timeout(75 * index);
      opacityValue.value = withTiming(1);
      translateValue.value = withSpring(0);
    })();
  }, []);
  return (
    <>
      <TouchableOpacity
        onLongPress={() => setDeleteModal(true)}
        onPress={() => showToast('info', 'Зажми чтобы удалить карточку')}
        delayLongPress={500}
        activeOpacity={0.8}>
        <Animated.View style={[styles.touchable, animatedStyles]}>
          <View style={{maxWidth: '58%'}}>
            <CustomText size={20} style={{marginBottom: 5, marginTop: 10}}>
              {title}
            </CustomText>
            <CustomText secondary size={15}>
              {formatDateStringWithTodayYesterday(new Date(card.date))} в{' '}
              {getTimeFromDate(new Date(card.date))}
            </CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.RED,
                ...styles.btn,
              }}
              activeOpacity={0.7}
              onPress={() => onPress(card.counter - 1)}>
              <MinusIcon />
            </TouchableOpacity>
            <CustomText size={28} style={{width: 50, textAlign: 'center'}}>
              {card.counter}
            </CustomText>
            <TouchableOpacity
              style={{
                backgroundColor: colors.GREEN,
                ...styles.btn,
              }}
              activeOpacity={0.7}
              onPress={() => onPress(card.counter + 1)}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
      <DeleteModal
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        title={title}
        id={id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.BORDER,
    backgroundColor: colors.ACCENT_DARK,
    borderRadius: 8,
    marginVertical: 9,
  },
  btn: {
    borderRadius: 100,
    padding: 3,
  },
});

export default Card;
