import { useEffect, useRef } from 'react';
import { useUserStore } from '@/store/UserStore';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useNotificationStore } from '@/store/NotificationStore';

export default function useNotificationWebSocket(
  handleNewNotification?: () => void,
) {
  const { member, isLoggedIn } = useUserStore();
  const { setHasUnread } = useNotificationStore();
  const eventSourceRef = useRef<EventSource | null>(null);
  const email = member.email;

  useEffect(() => {
    const subscribeSSE = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      const eventSource = new EventSourcePolyfill(
        `https://honlife.kro.kr/api/v1/notify/subscribe?email=${email}`,
        {
          headers: {
            Accept: 'text/event-stream',
          },
          heartbeatTimeout: 1000 * 60 * 10,
          withCredentials: true,
        },
      );

      eventSourceRef.current = eventSource;

      eventSource.addEventListener('open', () => {
        console.log('✅ SSE 연결됨');
      });

      eventSource.addEventListener('notify', (event) => {
        const hasUnread = event.data;
        setHasUnread(hasUnread);
        console.log('📩 알림 수신:', hasUnread);

        if (hasUnread && handleNewNotification) {
          handleNewNotification();
        }
      });

      eventSource.onerror = (err) => {
        console.error('❌ SSE 오류:', err);
        eventSource.close();
      };
    };

    if (isLoggedIn && email) {
      subscribeSSE();
    }

    return () => {
      eventSourceRef.current?.close();
    };
  }, [isLoggedIn, email, handleNewNotification, setHasUnread]);
}

// import { useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
// import { useUserStore } from '@/store/UserStore';

// export default function useNotificationWebSocket(
//   onNewNotification: () => void,
// ) {
//   const { member, isLoggedIn } = useUserStore();
//   const email = member.email;

//   useEffect(() => {
//     if (!isLoggedIn || !email) return;

//     const socketUrl = 'https://honlife.kro.kr/ws/connect';
//     const socket = new SockJS(socketUrl);

//     const stompClient = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       debug: () => {},
//     });

//     let pingInterval: NodeJS.Timeout;

//     stompClient.onConnect = () => {
//       console.log(`웹소켓 연결됨: /topic/notify/${email}`);

//       stompClient.subscribe(`/topic/notify/${email}`, () => {
//         onNewNotification();
//       });

//       // 🟡 60초마다 Ping 전송
//       pingInterval = setInterval(() => {
//         if (stompClient.connected) {
//           stompClient.publish({
//             destination: `/ping`,
//             body: 'ping',
//           });
//         }
//       }, 60000);
//     };

//     stompClient.activate();

//     return () => {
//       stompClient.deactivate();
//       clearInterval(pingInterval);
//     };
//   }, [isLoggedIn, email, onNewNotification]);
// }
