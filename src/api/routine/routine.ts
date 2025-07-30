import {
  AboutRoutine,
  AddRoutine,
  DayRoutine,
  EditRoutine,
  WeekRoutineMap,
} from '../../../types/routine';
import { axiosInstance } from '../axiosInstance';

// 오늘 루틴 불러오기
export const fetchTodayRoutine = async (): Promise<DayRoutine[]> => {
  const response = await axiosInstance.get('/api/v1/routines/today');
  console.log('오늘 루틴 로드:', response.data.data);
  return response.data.data;
};

// 주간 루틴 불러오기
export const fetchWeekRoutine = async (
  date?: string,
): Promise<WeekRoutineMap> => {
  const response = await axiosInstance.get('/api/v1/routines/weekly', {
    params: { date },
  });
  return response.data.data;
};

// 특정 루틴 상세조회
export const aboutRoutine = async (id: string): Promise<AboutRoutine> => {
  try {
    const response = await axiosInstance.get(`/api/v1/routines/${id}`);
    console.log('상세조회 성공:', response.data);
    return response.data.data;
  } catch (err) {
    console.error('루틴 상세조회 실패:', err);
    throw err;
  }
};

// 루틴 완료 또는 미완료 처리
export const routineHandler = async (id: number, isDone: boolean) => {
  const response = await axiosInstance.patch(
    `/api/v1/routines/schedules/${id}`,
    { isDone },
  );
  console.log('루틴 완료처리에 전달되는 스케쥴 id:', id);
  console.log('루틴 완료처리에 전달되는 isDone:', isDone);
  console.log('루틴 완료 또는 미완료 처리:', response.data);
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
export const deleteRoutine = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/routines/${id}`);
    console.log('루틴삭제 성공:', response.data);
    return response.data;
  } catch (err) {
    console.error('루틴삭제 실패:', err);
    throw err;
  }
};

// 루틴 수정
export const editRoutine = async (id: number, data: EditRoutine) => {
  const response = await axiosInstance.patch(`/api/v1/routines/${id}`, data);
  console.log('루틴 수정 완료:', response);
  return response.data;
};

// 루틴 프리셋 불러오기
export const getPreset = async (categoryId: number) => {
  const response = await axiosInstance.get(`/api/v1/routines/presets`, {
    params: { categoryId },
  });
  console.log('프리셋 불러옴:', response.data.data.presets);
  return response.data.data.presets;
};
