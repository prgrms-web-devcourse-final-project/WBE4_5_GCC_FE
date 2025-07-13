import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  startOfYear,
} from 'date-fns';
import { ko } from 'date-fns/locale';

const useCalender = (selectedDate: Date) => {
  // 일~토 요일을 모아두는 배열
  const weekDays = [];
  const weekStartDate = startOfWeek(new Date(), { locale: ko });
  for (let day = 0; day < 7; day += 1) {
    const date = addDays(weekStartDate, day);
    weekDays.push(format(date, 'EEEEEE', { locale: ko }));
  }
  // 현재 선택된 년도에서 1월~12월까지 Date 객체로 들어있는 배열
  const allMonth = [];
  const startMonth = startOfYear(selectedDate);
  for (let month = 0; month < 12; month += 1) {
    allMonth.push(addMonths(startMonth, month));
  }

  const 현재달의시작날짜 = startOfMonth(selectedDate);
  const 현재달의마지막날짜 = endOfMonth(selectedDate);
  const 현재달의첫주의시작날짜 = startOfWeek(현재달의시작날짜);
  const 현재달마지막주의끝날짜 = endOfWeek(현재달의마지막날짜);
  const currentMonthAllDates = eachDayOfInterval({
    start: 현재달의첫주의시작날짜,
    end: 현재달마지막주의끝날짜,
  });

  return { weekDays, currentMonthAllDates, allMonth };
};
export default useCalender;
