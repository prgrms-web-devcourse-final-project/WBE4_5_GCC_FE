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

// 아이템 수정
interface AdminItemEditPayload {
  itemType: string;
  itemName: string;
  price: number;
  key: string;
  itemDescription: string;
  isListed: boolean;
}

export const EditAdminItemById = async (
  id: number,
  payload: AdminItemEditPayload,
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

// 아이템 생성
interface AdminItemCreatePayload {
  itemKey: string;
  itemType: string;
  itemName: string;
  itemPrice: number;
  isListed: boolean;
  itemDescription: string;
}
export const AddAdminItems = async (payload: AdminItemCreatePayload) => {
  try {
    const response = await axiosInstance.post('/api/v1/admin/items', payload);
    console.log('아이템 추가 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 추가 실패', error);
    throw error;
  }
};

// 아이템 삭제 - 사용 ㅇ
export const DeleteAdminItemById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/admin/items/${id}`);
    console.log('아이템 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 삭제 실패', error);
    throw error;
  }
};
