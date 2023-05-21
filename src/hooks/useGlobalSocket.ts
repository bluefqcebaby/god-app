import { useContext, useEffect, useRef, useState } from 'react';
import { keys, WS_URL } from '../constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { MainContext } from '../../App';
import Config from 'react-native-config';

interface IMessageEvent {
  sender: string;
  message: string;
}

export const useGlobalSocket = () => {
  const queryClient = useQueryClient();

  const { socket, username } = useContext(MainContext);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');

      const name = await AsyncStorage.getItem('name');

      socket.send(JSON.stringify({ event: 'auth', data: { token } }));

      socket.onmessage = async message => {
        const { event, data, status } = message.data;
        if (status !== 1) {
          return console.log('error in onmessage error', data);
        }
        switch (event) {
          case 'auth': {
          }
        }
        // const data: IMessageEvent = JSON.parse(event.data);
        // console.log(data);
        // queryClient.setQueryData<any[]>(
        //   [keys.messages, data.sender].filter(Boolean),
        //   oldData => {
        //     if (!oldData) return;
        //     return [
        //       ...oldData,
        //       { from: data.sender, to: name, message: data.message },
        //     ];
        //   },
        // );

        await queryClient.invalidateQueries([keys.chatUsers]);
      };

      socket.onclose = event => {
        console.log(event, 'close');
      };
    })();

    return () => socket.close();
  }, [username]);
};
