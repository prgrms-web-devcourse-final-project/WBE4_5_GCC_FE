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
