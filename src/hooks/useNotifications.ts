import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useUserStore } from '@/store/UserStore';

export default function useNotificationWebSocket(
  onNewNotification: () => void,
) {
  const { member, isLoggedIn } = useUserStore();

  useEffect(() => {
    if (!isLoggedIn || !member.email) return;

    const socketUrl = 'https://honlife.kro.kr/ws/connect';

    const socket = new SockJS(socketUrl);

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.error(str);
      },
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/notify/${member.email}`, () => {
        onNewNotification();
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [onNewNotification, isLoggedIn, member.email]);
}
