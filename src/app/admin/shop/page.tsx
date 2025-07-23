'use client';

import { useState, useEffect } from 'react';
import item1 from '@/app/assets/images/item1.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import AlertModal from '@/app/components/common/alert/AlertModal';
import { DeleteAdminItemById } from '@/api/admin/adminItems';

// 기능 구현때 삭제
import { StaticImageData } from 'next/image';
import Tabs from '@/app/components/shop/Tabs';
import ItemCard from '@/app/components/shop/ItemCard';
import { useRouter } from 'next/navigation';
import { AdminItems } from '@/api/admin/adminItems';

interface AdminItem {
  itemId: number;
  itemKey: string;
  itemName: string;
  itemPrice: number;
  itemType: 'TOP' | 'BOTTOM' | 'ACCESSORY';
  itemDescription?: string;
  createTime: string;
  updateTime: string;
}

export default function AdminShop() {
  const router = useRouter();
  const tabList = ['전체', '상의', '하의', '액세서리'];
  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  const [loading, setLoading] = useState(false); // 나중엔 true로 바꿔야 함
  const [items, setItems] = useState<AdminItem[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState<{
    isOpen: boolean;
    item: AdminItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: AdminItem | null;
  }>({ isOpen: false, item: null });

  const tabMap: Record<string, AdminItem['itemType']> = {
    상의: 'TOP',
    하의: 'BOTTOM',
    액세서리: 'ACCESSORY',
  };

  const filteredItem =
    selectedTab === '전체'
      ? items
      : items.filter((item) => item.itemType === tabMap[selectedTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AdminItems();
        console.log('아이템 정보:', res);
        setItems(res.data);
      } catch (error) {
        console.error('아이템 정보를 불러오지 못했습니다', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 삭제 후 업데이트
  const fetchData = async () => {
    try {
      const res = await AdminItems();
      setItems(res.data);
    } catch (error) {
      console.error('아이템 정보를 불러오지 못했습니다', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto mt-[38px] flex w-full max-w-screen-sm flex-col px-5">
        <div className="flex justify-between pr-[2px]">
          <Tabs
            tabs={tabList}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {isDeleteMode.isOpen ? (
            <button
              className="text-xs font-medium text-[#D32F2F]"
              onClick={() => setIsDeleteMode({ isOpen: false, item: null })}
            >
              완료
            </button>
          ) : (
            <Trash2
              className="h-auto w-[14px] text-[#D32F2F]"
              onClick={() => setIsDeleteMode({ isOpen: true, item: null })}
            />
          )}
        </div>

        <div className="w-full min-w-[350px] rounded-tl-none rounded-tr-lg rounded-b-lg border-1 border-[#d9d9d9] px-4 py-6">
          <div className="grid w-full grid-cols-3 place-items-center gap-3">
            {/* 아이템 등록 버튼 */}
            <button
              className="flex aspect-[92/128] h-[140px] min-w-[92px] items-center justify-center rounded-[5px] border-1 border-[#d9d9d9] text-[12px] text-[#9A9898] shadow-[1px_2px_4px_rgba(0,0,0,0.1)]"
              onClick={() => {
                router.push('/admin/shop/add-item');
              }}
            >
              + 아이템 등록
            </button>
            {filteredItem.map((item) => (
              <ItemCard
                key={item.itemId}
                item={item}
                onClick={() =>
                  router.push(`/admin/shop/edit-item/${item.itemId}`)
                }
                onDeleteClick={(item) => setDeleteModal({ isOpen: true, item })}
                isDeleteMode={isDeleteMode.isOpen}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-[41px] flex items-center justify-center space-x-[11px]">
            <button className="text-[#222222]">
              <ChevronLeft className="h-3 w-auto" />
            </button>
            <button className="text-[10px] font-medium text-gray-700">1</button>
            <button className="text-[10px] font-medium text-gray-700">2</button>
            <button className="flex h-[17px] w-[18px] items-center justify-center rounded-[3px] bg-[#222222] text-center text-[10px] font-semibold text-white">
              3
            </button>
            <button className="text-[#D9D9D9]">
              <ChevronRight className="h-3 w-auto" />
            </button>
          </div>
        </div>
        {deleteModal.isOpen && deleteModal.item && (
          <AlertModal
            isOpen={true}
            type="delete"
            title="정말 삭제하시겠습니까?"
            description={`[${deleteModal.item.itemName}] 아이템을 삭제하면 복구할 수 없습니다.`}
            confirmText="삭제"
            cancelText="취소"
            // 아이템 삭제 후 전체 목록 새로 불러오기
            onConfirm={() => {
              DeleteAdminItemById(deleteModal.item!.itemId)
                .then(() => fetchData())
                .finally(() => setDeleteModal({ isOpen: false, item: null }));
            }}
            onCancel={() => setDeleteModal({ isOpen: true, item: null })}
          />
        )}
      </div>
    </>
  );
}
