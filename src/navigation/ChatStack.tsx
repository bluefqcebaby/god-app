import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import ChatComponent from '../screens/chat';
import { colors } from '../constants/styles';
import { PersonChat } from '../screens/person-chat/person-chat';

export type ChatParams = {
  Chat: undefined;
};

const Chat = createNativeStackNavigator<ChatParams>();

export const ChatStack = () => {
  return (
    <Chat.Navigator
      initialRouteName="Chat"
      screenOptions={{ headerShown: false }}>
      <Chat.Screen
        name="Chat"
        component={ChatComponent}
        options={{
          title: 'Список диалогов',
        }}
      />
    </Chat.Navigator>
  );
};
