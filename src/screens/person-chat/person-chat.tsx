import Screen from '../../components/screen';
import CustomText from '../../components/custom-text';
import {FC, useContext, useEffect, useRef, useState} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatParams} from '../../navigation/ChatStack';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {keys} from '../../constants/strings';
import {getMessages} from '../../api/chat';
import CustomTextInput from '../../components/custom-text-input';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Context, RootProps} from '../../../App';
import Loader from '../../components/loader';
import ArrowRight from '../../assets/svg/arrow-right';
import {colors} from '../../constants/styles';
import {useGlobalSocket} from '../../hooks/useGlobalSocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Message} from './views/message';

type Props = NativeStackScreenProps<RootProps, 'ProfileChat'>;

export const PersonChat: FC<Props> = ({navigation, route}) => {
  const {socket} = useContext(Context);
  const queryClient = useQueryClient();
  const {id} = route.params;
  const {data, isLoading} = useQuery([keys.messages, id], () =>
    getMessages(id),
  );
  const nameRef = useRef<string>();
  const [message, setMessage] = useState('');
  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem('name');
      if (name) {
        nameRef.current = name;
      }
    })();
    navigation.setOptions({title: id});
  }, []);
  if (isLoading) {
    return (
      <Screen>
        <Loader
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
      </Screen>
    );
  }
  const onMessage = async () => {
    const sendMessage = {
      sender: nameRef.current,
      receiver: id,
      message,
    };
    socket!.send(JSON.stringify(sendMessage));
    data?.push({from: nameRef.current!, to: id, message});
    setMessage('');
    await queryClient.invalidateQueries([keys.chatUsers]);
  };
  return (
    <>
      <Screen
        style={{flexDirection: 'row'}}
        pressable
        onPress={() => Keyboard.dismiss()}>
        <FlatList
          inverted
          contentContainerStyle={{
            paddingBottom: 10,
            paddingHorizontal: 12,
            flexDirection: 'column-reverse',
          }}
          data={data}
          renderItem={({item}) => (
            <Message text={item.message} isMyself={item.from !== id} />
          )}
        />
      </Screen>

      <View style={styles.bottomView}>
        <TextInput
          style={styles.input}
          placeholder="Сообщение"
          multiline
          value={message}
          onChangeText={text => setMessage(text)}
        />
        {message.trim().length > 0 && (
          <Pressable onPress={onMessage} style={styles.sendButton}>
            <ArrowRight />
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    color: colors.WHITE,
    fontSize: 17,
    flex: 5,
  },
  bottomView: {
    paddingHorizontal: 12,
    backgroundColor: colors.ACCENT_DARK,
    flexDirection: 'row',
  },
  sendButton: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
});
