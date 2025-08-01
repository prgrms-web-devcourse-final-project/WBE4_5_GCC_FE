import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  wantEmail: boolean;
  residenceExperience: string;
  interestedCategoryIds: number[];
  region1Dept: string;
  region2Dept: string;
  region3Dept: string;
}
