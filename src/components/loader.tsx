import {
  ActivityIndicator,
  StyleProp,
  TransformsStyle,
  ViewStyle,
} from 'react-native';
import {FC} from 'react';
import {colors} from '../constants/styles';

interface Props {
  style?: ViewStyle;
  size?: 'large' | 'small';
}

const Loader: FC<Props> = ({style, size = 'large'}) => {
  return (
    <ActivityIndicator color={colors.PRIMARY_BLUE} style={style} size={size} />
  );
};

export default Loader;
