import { axiosInstance } from '../axiosInstance';

// 아이템 조회 - 사용 ㅇ
export const AdminItems = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/admin/items');
    console.log('아이템 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 불러오기 실패', error);
    throw error;
  }
};

// 특정 아이템 조회 - 사용 ㅇ
export const AdminItemById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/admin/items/${id}`);
    console.log('아이템 단건 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 단건 조회 실패', error);
    throw error;
  }
};

// 아이템 수정
interface EditAdminItemPayload {
  itemKey: string;
  itemName: string;
  price: number;
  itemType: string;
}

export const EditAdminItemById = async (
  id: string,
  payload: EditAdminItemPayload,
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/admin/items/${id}`,
      payload,
    );
    console.log('아이템 수정 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 수정 실패', error);
    throw error;
  }
};
