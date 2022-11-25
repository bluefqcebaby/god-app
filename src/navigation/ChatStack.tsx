import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './routes';
import {Chat as ChatComponent} from '../screens/chat/chat';
import {colors} from '../constants/styles';
import {PersonChat} from '../screens/person-chat/person-chat';

export type ChatParams = {
  Chat: undefined;
};

const Chat = createNativeStackNavigator<ChatParams>();

export const ChatStack = () => {
  return (
    <Chat.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.DARK_BACKGROUND,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Golos-Regular',
        },
      }}>
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
