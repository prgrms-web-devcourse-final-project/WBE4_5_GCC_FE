// 오늘 루틴 불러오기
export interface DayRoutine {
  scheduleId: number;
  routineId: number;
  majorCategory: string;
  subCategory: string | null;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
  date: string;
  InitDate: string;
  repeatType: string;
  repeatValue: string;
}

// 일주일 루틴 받아오는 타입
// export type WeekRoutineMap =  Record<string, DayRoutine[]>;
export interface WeekRoutineMap {
  date: string | null;
  routines: Record<string, DayRoutine[]>;
}

// 특정 루틴 상세조회
export interface AboutRoutine {
  routineId: number;
  categoryId: number;
  majorCategory: string;
  subCategory: string | null;
  name: string;
  triggerTime: string;
  isImportant: boolean;
  repeatType: string;
  repeatValue: string;
  InitDate: string;
}

// 루틴 추가할때 보낼 데이터 아입
export interface AddRoutine {
  categoryId: number;
  name: string;
  majorCategory: string;
  subCategory?: string | null;
  InitDate: string;
  triggerTime: string;
  isImportant: boolean;
  repeatType: string;
  repeatValue?: string | null;
  repeatTerm?: number;
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

// 루틴 수정
export interface EditRoutine {
  name: string;
  majorCategory: string;
  subCategory?: string | null;
  InitDate: string;
  triggerTime: string;
  isImportant: boolean;
  repeatType: string;
  repeatValue: string | undefined;
  repeatTerm: number;
}
