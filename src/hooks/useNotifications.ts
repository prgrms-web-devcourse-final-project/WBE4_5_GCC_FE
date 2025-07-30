import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function useNotificationWebSocket(
  onMessage: (msg: string) => void,
) {
  useEffect(() => {
    const socket = new SockJS('https://littlestep-gcc-final.vercel.app/');

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [onMessage]);
}
