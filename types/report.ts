export type RoutineCount = {
  totalCount: number;
  completedCount: number;
};

export type DayRoutineCount = {
  date: string;
  completionRate: number;
};

export type CategoryCount = {
  categoryName: string;
  totalCount: number;
};

export type TopRoutine = {
  rank: number;
  categoryName: string;
  completedCount: number;
};

export type ReportData = {
  routineCount: RoutineCount;
  dayRoutineCount: DayRoutineCount[];
  categoryCount: CategoryCount[];
  top5: TopRoutine[];
  totalPoint: number;
  aiComment: string;
};
