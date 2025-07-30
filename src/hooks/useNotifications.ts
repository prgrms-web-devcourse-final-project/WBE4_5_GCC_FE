import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function useNotificationWebSocket(
  onMessage: (msg: string) => void,
) {
  useEffect(() => {
    const socket = new SockJS('http://localhost:8083/ws/connect');

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
    });

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/notify', (message) => {
        if (message.body) {
          onMessage(message.body);
        }
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [onMessage]);
}
