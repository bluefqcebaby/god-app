import {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../../../components/custom-text';
import {colors} from '../../../constants/styles';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../navigation/routes';

interface Props {
  name: string;
  onPress: () => void;
}

export const SearchCard: FC<Props> = ({name, onPress}) => {
  return (
    <Pressable style={styles.box} onPress={onPress}>
      <CustomText>{name}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingVertical: 15,
    paddingLeft: 24,
    backgroundColor: colors.ACCENT_DARK,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.BORDER,
  },
});
