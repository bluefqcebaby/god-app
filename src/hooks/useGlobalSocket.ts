import {useContext, useEffect, useRef, useState} from 'react';
import {keys, WS_URL} from '../constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQueryClient} from '@tanstack/react-query';
import {Context} from '../../App';

const func = (daun: string) => {
  console.log(`${daun} hello`);
};

interface IMessageEvent {
  sender: string;
  message: string;
}

export const useGlobalSocket = () => {
  let socket: WebSocket = <WebSocket>{};
  const queryClient = useQueryClient();
  const {setSocket} = useContext(Context);
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      const name = await AsyncStorage.getItem('name');
      socket = new WebSocket(`${WS_URL}/ws/${token}`);
      socket.onopen = () => {
        console.log('socket open');
      };
      socket.onmessage = event => {
        const data: IMessageEvent = JSON.parse(event.data);
        queryClient.setQueryData<any[]>(
          [keys.messages, data.sender].filter(Boolean),
          oldData => {
            if (!oldData) return;
            return [
              ...oldData,
              {from: data.sender, to: name, message: data.message},
            ];
          },
        );
      };
      socket.onclose = event => {
        console.log(event, 'close');
      };
      setSocket!(socket);
    })();
  }, []);
  return socket;
};
