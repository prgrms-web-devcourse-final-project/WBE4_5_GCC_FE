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

// 관리자 루틴 프리셋 삭제
export const deletePreset = async (presetId: number) => {
  const response = await axiosInstance.delete(
    `/api/v1/admin/routines/presets/${presetId}`,
  );
  return response.data;
};

// 추천 루틴 프리셋 수정
export const editPreset = async (presetId: number) => {
  const response = await axiosInstance.patch(
    `/api/v1/admin/routines/presets/${presetId}`,
  );
  return response.data;
};

// 추천 루틴 프리셋 추가
interface Preset {
  categoryId: number;
  triggerTime: string;
  isImportant: boolean;
  repeatType: string;
  repeatValue: string;
  name: string;
  repeatTerm: number;
}
export const addPreset = async (addPresetData: Preset) => {
  const response = await axiosInstance.post(
    `/api/v1/admin/routines/presets`,
    addPresetData,
  );
  return response.data;
};
