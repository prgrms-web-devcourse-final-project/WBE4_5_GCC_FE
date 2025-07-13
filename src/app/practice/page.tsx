'use client';
import { useState } from 'react';
import Notification from '../components/common/Notification';

export default function page() {
  const [openNoti, setOpenNoti] = useState(false);

  const [noti, setNoti] = useState([
    {
      title: '[운동하기] 루틴 시작할 시간이 되었어요! 지금 시작해볼까요?',
      date: '2025.05.23',
      new: true,
    },
    {
      title: '[요리] 루틴 시작할 시간이 되었어요! 지금 시작해볼까요?',
      date: '2025.05.23',
      new: true,
    },
    {
      title: '[쓰레기 버리기] 루틴 시작할 시간이 되었어요! 지금 시작해볼까요?',
      date: '2025.05.22',
      new: false,
    },
    {
      title: '[나갈 준비하기] 루틴 시작할 시간이 되었어요! 지금 시작해볼까요?',
      date: '2025.05.21',
      new: false,
    },
    {
      title: '[운동하기] 루틴 시작할 시간이 되었어요! 지금 시작해볼까요?',
      date: '2025.05.17',
      new: false,
    },
  ]);
  return (
    <>
      <Notification setOpenNoti={setOpenNoti} noti={noti} />
    </>
  );
}
