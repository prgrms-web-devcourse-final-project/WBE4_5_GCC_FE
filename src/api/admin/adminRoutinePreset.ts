import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

// 루틴 프리셋 불러옴
export const loadPreset = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 30000));
  const response = await axiosInstance.get('api/v1/admin/routines/presets');
  console.log('프리셋 불러옴:', response.data.data.presets);
  return response.data.data.presets;
};

export function UseAdminPreset() {
  return useQuery({
    queryKey: ['admin-preset'],
    queryFn: loadPreset,
  });
}
