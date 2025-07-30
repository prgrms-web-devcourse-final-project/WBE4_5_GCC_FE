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
    if (!isLoggedIn || !email) return;

    const socketUrl = 'https://honlife.kro.kr/ws/connect';
    const socket = new SockJS(socketUrl);

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: () => {},
    });

    let pingInterval: NodeJS.Timeout;

    stompClient.onConnect = () => {
      console.log(`웹소켓 연결됨: /topic/notify/${email}`);

      stompClient.subscribe(`/topic/notify/${email}`, () => {
        onNewNotification();
      });

      // 🟡 60초마다 Ping 전송
      pingInterval = setInterval(() => {
        if (stompClient.connected) {
          stompClient.publish({
            destination: `/ping`,
            body: 'ping',
          });
        }
      }, 60000);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      clearInterval(pingInterval);
    };
  }, [isLoggedIn, email, onNewNotification]);
}
