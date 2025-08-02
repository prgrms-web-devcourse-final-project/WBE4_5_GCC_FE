'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShopItem } from '../../../../types/general';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminItems, DeleteAdminItemById } from '@/api/admin/adminItems';

import Tabs from '@/app/components/shop/Tabs';
import ItemCard from '@/app/components/shop/ItemCard';
import { Trash2 } from 'lucide-react';
import AlertModal from '@/app/components/common/alert/AlertModal';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';

export default function AdminShop() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const tabList = ['전체', '상의', '하의', '액세서리'];
  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  const [isDeleteMode, setIsDeleteMode] = useState({
    isOpen: false,
    item: null as ShopItem | null,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    item: null as ShopItem | null,
  });

  const tabMap: Record<string, ShopItem['itemType']> = {
    상의: 'TOP',
    하의: 'BOTTOM',
    액세서리: 'ACCESSORY',
  };

  // 아이템 목록 조회
  const { data: items = [], isLoading } = useQuery({
    queryKey: ['admin-items'],
    queryFn: AdminItems,
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });

  const filteredItem =
    selectedTab === '전체'
      ? items
      : items.filter((item: ShopItem) => item.itemType === tabMap[selectedTab]);

  // 아이템 삭제
  const deleteItemMutation = useMutation({
    mutationFn: DeleteAdminItemById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-items'] }); // 삭제 후 목록 갱신
    },
    onError: (error) => {
      console.error('삭제 실패', error);
      alert('삭제에 실패했습니다.');
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

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

        <div className="w-full min-w-[350px] bg-white rounded-tl-none rounded-tr-lg rounded-b-lg border-1 border-[#d9d9d9] px-4 py-6">
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
            {filteredItem.map((item: ShopItem) => (
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
          {/*<div className="mt-[41px] flex items-center justify-center space-x-[11px]">
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
          </div>*/}
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
              deleteItemMutation.mutate(deleteModal.item!.itemId);
              setDeleteModal({ isOpen: false, item: null });
            }}
            onCancel={() => setDeleteModal({ isOpen: true, item: null })}
          />
        )}
      </div>
    </>
  );
}
