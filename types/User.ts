export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  email: string;
  password: string;
  name: string;
  nickname: string;
  residenceExperience:
    | 'UNDER_1Y'
    | 'Y1_TO_3'
    | 'Y3_TO_5'
    | 'Y5_TO_10'
    | 'OVER_10Y';
  region1Dept: string;
  region2Dept: string;
  region3Dept: string;
  isActive: boolean;
}
