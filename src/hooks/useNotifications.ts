import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useUserStore } from '@/store/UserStore';

export default function useNotificationWebSocket(
  onNewNotification: () => void,
) {
  const { member, isLoggedIn } = useUserStore();
  const email = member.email;

  useEffect(() => {
    if (!isLoggedIn || !email) {
      console.log(
        '이메일이 없거나 로그인되지 않았습니다. 알림을 수신할 수 없습니다.',
      );
      return;
    }

    console.log('회원 이메일:', email);

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
      stompClient.subscribe(`/topic/notify/${email}`, () => {
        onNewNotification();
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [onNewNotification, isLoggedIn, email]);
}
