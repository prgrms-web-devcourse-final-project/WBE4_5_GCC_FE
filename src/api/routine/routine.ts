import { useRouter } from 'next/navigation';
import {
  AboutRoutine,
  AddRoutine,
  RoutineResponse,
  WeekRoutineMap,
} from '../../../types/routine';
import { axiosInstance } from '../axiosInstance';

// 루틴 불러오기 (수정 전까지는 이거 쓰기)
export const UserRoutine = async (date?: string): Promise<RoutineResponse> => {
  try {
    const response = await axiosInstance.get('/api/v1/routines', {
      params: { date },
    });
    console.log(response.data.data);
    return response.data.data; // date와 routines 둘 다 포함된 객체 리턴
  } catch (error) {
    console.error('루틴 불러오기 실패', error);
    throw error;
  }
};

// 주간 루틴 불러오기 (아직 서버 반영안됨)
export const weekRoutine = async (date?: string): Promise<WeekRoutineMap> => {
  try {
    const response = await axiosInstance.get('/api/v1/routines', {
      params: { date },
    });
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.error('루틴 불러오기 실패', error);
    throw error;
  }
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
