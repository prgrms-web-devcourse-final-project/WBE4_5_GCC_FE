// 오늘 루틴 불러오기
export interface DayRoutine {
  scheduleId: number;
  categoryId: number;
  routineId: number;
  majorCategory: string;
  subCategory: string | null;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
  date: string;
  initDate: string;
  repeatType: string;
  repeatValue: string;
  // emoji: string;
}
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
  initDate: string;
  emoji: string;
}

// 루틴 추가할때 보낼 데이터 아입
export interface AddRoutine {
  name: string;
  categoryId: number;
  initDate: string;
  repeatType: string;
  triggerTime: string;
  isImportant: boolean;
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
  categoryId: number;
  initDate: string;
  triggerTime: string;
  isImportant: boolean;
  repeatType: string;
  repeatValue?: string | null;
  repeatTerm?: number;
}
