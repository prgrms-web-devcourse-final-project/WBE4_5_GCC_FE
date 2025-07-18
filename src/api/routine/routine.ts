import {
  AboutRoutine,
  AddRoutine,
  DayRoutine,
  WeekRoutineMap,
} from '../../../types/routine';
import { axiosInstance } from '../axiosInstance';

// 오늘 루틴 불러오기
export const UserRoutine = async (): Promise<DayRoutine[]> => {
  try {
    const response = await axiosInstance.get('/api/v1/routines/today');
    console.log('오늘의 루틴:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('루틴 불러오기 실패', error);
    throw error;
  }
};

// 주간 루틴 불러오기
export const weekRoutine = async (date?: string): Promise<WeekRoutineMap> => {
  const response = await axiosInstance.get('/api/v1/routines/weekly', {
    params: { date },
  });
  console.log('주간 데이터 로드:', response.data.data);
  return response.data.data;
};

// 특정 루틴 상세조회
export const aboutRoutine = async (id: string): Promise<AboutRoutine> => {
  try {
    const response = await axiosInstance.get(`/api/v1/routines/${id}`);
    console.log('상세조회 성공:', response.data);
    // data.data로 해줘야 code,message 를 빼고 data만 반환한다. 그러면 AboutRoutine이랑 타입이 같아진다.
    return response.data.data;
  } catch (err) {
    console.error('루틴 상세조회 실패:', err);
    throw err;
  }
};

// 루틴 완료 또는 미완료 처리
export const routineHandler = async (id: number, isDone: boolean) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/routines/schedules/${id}`,
      { isDone },
    );
    console.log('루틴 완료처리에 전달되는 id:', id);
    console.log('루틴 완료처리에 전달되는 isDone:', isDone);
    console.log('루틴 완료 또는 미완료 처리:', response.data);
  } catch (error) {
    console.error(error);
  }
};

// 루틴 추가하기
export const addRoutine = async (routine: AddRoutine) => {
  try {
    const response = await axiosInstance.post('/api/v1/routines', routine);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 루틴 삭제
export const deleteRoutine = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/routines/${id}`);
    console.log('루틴삭제 성공:', response.data);
    return response.data;
  } catch (err) {
    console.error('루틴삭제 실패:', err);
    throw err;
  }
};
