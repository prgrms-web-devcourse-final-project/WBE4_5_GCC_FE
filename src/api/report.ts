import { axiosInstance } from './axiosInstance';
import { ReportData } from '../../types/report';

export const getWeeklyReport = (dateString: string): Promise<ReportData> => {
  return axiosInstance
    .get('/api/v1/members/dashboard', {
      params: { date: dateString },
    })
    .then((res) => res.data.data);
};
