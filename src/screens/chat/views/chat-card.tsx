import {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../../../components/custom-text';
import {colors} from '../../../constants/styles';
import {IChatUser} from '../../../api/chat';
import {getTimeFromDate} from '../../../lib/helpers';

interface Props {
  user: IChatUser;
  onPress: () => void;
}

export const ChatCard: FC<Props> = ({user, onPress}) => {
  const {message, time, is_myself} = user.last_message;
  return (
    <Pressable style={styles.box} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomText bold size={20}>
          {user.username}
        </CustomText>
        <CustomText>{getTimeFromDate(new Date(time))}</CustomText>
      </View>
      {is_myself && <CustomText secondary>ты</CustomText>}
      <View>
        <CustomText size={15} props={{numberOfLines: 2}}>
          {user.last_message.message}
        </CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.ACCENT_DARK,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.BORDER,
  },
});
