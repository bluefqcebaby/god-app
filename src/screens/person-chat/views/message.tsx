import {FC} from 'react';
import {View} from 'react-native';
import CustomText from '../../../components/custom-text';
import {colors} from '../../../constants/styles';

interface Props {
  text: string;
  isMyself: boolean;
}

export const Message: FC<Props> = ({text, isMyself}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 5,
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: colors.PRIMARY_BLUE,
        borderRadius: 8,
        maxWidth: '80%',
        alignSelf: isMyself ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={{
          position: 'absolute',
          left: isMyself ? undefined : -5,
          right: isMyself ? -5 : undefined,
          bottom: 0,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderRightWidth: 30,
          borderTopWidth: 30,
          borderRightColor: 'transparent',
          borderTopColor: colors.PRIMARY_BLUE,
          transform: [{rotate: isMyself ? '-90deg' : '180deg'}],
        }}></View>
      <CustomText>{text}</CustomText>
    </View>
  );
};
