import {FC} from 'react';
import {
  Pressable,
  Animated,
  Easing,
  ButtonProps,
  ViewStyle,
} from 'react-native';
import CustomText from './custom-text';
import {colors} from '../constants/styles';
import Loader from './loader';

interface Props {
  text: string;
  loading?: boolean;
  isDelete?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  outlet?: boolean;
}

const CustomButton: FC<Props> = ({
  text,
  loading,
  outlet,
  style,
  isDelete,
  onPress,
}) => {
  const color = loading
    ? colors.MIDNIGHT
    : isDelete
    ? colors.RED
    : colors.PRIMARY_BLUE;
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: 8,
        backgroundColor: outlet ? undefined : color,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        ...style,
      }}
      disabled={loading}>
      {loading && <Loader style={{position: 'absolute'}} />}
      <CustomText
        bold
        loading={loading}
        style={{color: outlet ? colors.DARK_LINK : undefined}}>
        {text}
      </CustomText>
    </Pressable>
  );
};

export default CustomButton;
