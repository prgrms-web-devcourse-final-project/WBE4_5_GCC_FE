// 이 두개는 곧 지울듯
export interface RoutineResponse {
  date: string;
  routines: RoutineItem[];
}

export interface RoutineItem {
  routineId: number;
  scheduleId: number;
  majorCategory: string;
  subCategory: string;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
}

// 하루치 루틴
export interface DayRoutine {
  scheduleId: number;
  routineId: number;
  majorCategory: string;
  subCategory: string;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
  date: string;
}
// 일주일 루틴 받아오는 타입
export type WeekRoutineMap = Record<string, DayRoutine[]>;

// 특정 루틴 상세조회
export interface AboutRoutine {
  routineId: number;
  categoryId: number;
  majorCategory: string;
  subCategory: string;
  name: string;
  triggerTime: string;
  isImportant: boolean;
  repeatType: string;
  repeatValue: string;
}

// 루틴 추가할때 보낼 데이터 아입
export interface AddRoutine {
  categoryId: number;
  content: string;
  triggerTime?: string;
  isImportant?: boolean;
  repeatType?: string;
  repeatValue?: string;
  date: string;
}

// 루틴 완료 타입
export interface RoutineHandler {
  code: string;
  message: string;
  data: [];
}

// 루틴 삭제
export interface DeleteRoutine {
  code: string;
  message: string;
  data: {};
}
