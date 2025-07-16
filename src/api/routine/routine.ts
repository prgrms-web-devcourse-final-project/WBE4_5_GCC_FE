import { RoutineResponse } from '../../../types/routine';
import { axiosInstance } from '../axiosInstance';

// 루틴 불러오기
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

interface AddRoutine {
  categoryId: number;
  content: string;
  triggerTime?: string;
  isImportant?: boolean;
  repeatType?: string;
  repeatValue?: string;
}
// 루틴 추가하기
export const addRoutine = async (routine: AddRoutine) => {
  try {
    const response = await axiosInstance.post('/api/v1/rouintes', routine);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
