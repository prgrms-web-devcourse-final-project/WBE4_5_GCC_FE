import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function useNotificationWebSocket(
  onNewNotification: () => void,
) {
  useEffect(() => {
    const socket = new SockJS(
      'wss://littlestep-gcc-final.vercel.app/ws/connect',
    );

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.error(str);
      },
    });

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/notify', () => {
        onNewNotification();
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [onNewNotification]);
}
