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
}

const Loader: FC<Props> = ({style}) => {
  return (
    <ActivityIndicator
      color={colors.PRIMARY_BLUE}
      style={style}
      size={'large'}
    />
  );
};

export default Loader;
