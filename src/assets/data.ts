import {Routes} from '../navigation/routes';
import {HomeStack} from '../navigation/HomeStack';
import {ChatStack} from '../navigation/ChatStack';

export const tabs = [
  {
    path: Routes._home,
    title: 'Главная',
    screen: HomeStack,
    type: 'home',
  },
  {
    path: Routes.chat,
    title: 'Чат',
    screen: ChatStack,
    type: 'chat-outline',
  },
];
