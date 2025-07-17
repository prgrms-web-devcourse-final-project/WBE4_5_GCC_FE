'use client';

import { useEffect, useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { CircleMinus } from 'lucide-react';
import AlertModal from '@/app/components/common/alert/AlertModal';
import { useSearchParams, useRouter } from 'next/navigation';
import { Categories, CreateCategory } from '@/api/categories';
import CategoryNameInputBottomSheet from '@/app/components/common/ui/CategoryNameInputBottomSheet';
import EditSubcategoryLayout from './layout';
import { CategoryItem } from '../../../../../types/types';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const labelFromParams = searchParams.get('label');
  const icon = searchParams.get('icon');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [label, setLabel] = useState('');
  const [subCategories, setSubCategories] = useState<CategoryItem[]>([]);
  //const [mode, setMode] = useState<'MAJOR' | 'SUB' | null>(null); // 바텀 시트를 열은 버튼의 출처 (대분류 카테고리 인풋창 or 세부 카테고리 추가 버튼)
  const [categoryType, setCategoryType] = useState<
    'MAJOR' | 'SUB' | 'CUSTOM' | null
  >(null);

  useEffect(() => {
    if (labelFromParams) setLabel(labelFromParams);
  }, [labelFromParams]);

  // MAJOR 카테고리는 이름 수정 막기
  useEffect(() => {
    const fetchCategoryType = async () => {
      const res = await Categories();
      const data: CategoryItem[] = res.data;
      const matched = data.find((cat) => cat.categoryName === labelFromParams);
      if (matched) {
        setCategoryType(matched.categoryType);
        setLabel(matched.categoryName); // 이걸로 label 초기화
      }
    };
    fetchCategoryType();
  }, [labelFromParams]);

  // 서브 카테고리 불러오기
  useEffect(() => {
    if (!label) return;
    const fetchSubs = async () => {
      const res = await Categories();
      const data: CategoryItem[] = res.data;
      const filtered = data.filter(
        (cat) => cat.categoryType === 'SUB' && cat.parentName === label,
      );
      setSubCategories(filtered);
    };
    fetchSubs();
  }, [label]);

  // 완료 버튼에서 실제 생성 API 호출
  const handleComplete = async () => {
    if (!label || categoryType === 'SUB') {
      alert('카테고리 정보를 확인해주세요.');
      return;
    }

    try {
      await Promise.all(
        subCategories.map((sub) =>
          CreateCategory({
            categoryName: sub.categoryName,
            categoryType: 'SUB',
            parentName: label,
          }),
        ),
      );
      alert('카테고리 생성 완료!');
      router.push('/routine/edit-category');
    } catch (err) {
      console.error('카테고리 생성 실패', err);
      alert('생성에 실패했습니다.');
    }
  };

  return (
    <>
      <EditSubcategoryLayout onComplete={handleComplete}>
        <div className="flex flex-col gap-7 px-5 py-7">
          <div className="flex items-center gap-3">
            {/* 좌측 아이콘 영역 */}
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-lg border border-[#E0E0E0]">
              {icon}
            </div>

            {/* 우측 인풋 영역 */}
            <div className="w-70 flex-auto border border-transparent border-b-[#E0E0E0] py-2 text-xl text-black">
              <input
                type="text"
                value={label}
                placeholder="카테고리 이름 입력"
                onChange={(e) => setLabel(e.target.value)}
                className="focus:border-transparent focus:ring-0 focus:outline-none"
                disabled={categoryType === 'MAJOR'}
              />
            </div>
          </div>

          {/* 서브 카테고리 추가 */}
          <button
            onClick={() => {
              //setMode('SUB');
              setIsBottomSheetOpen(true);
            }}
            className="flex gap-2"
          >
            <CirclePlus className="h-auto w-5 fill-[#388E3C] text-white" />
            <p className="text-medium text-base text-[#388E3C]">
              세부 카테고리
            </p>
          </button>

          {/* 소분류 (서브 카테고리) 영역 */}
          <div className="flex flex-col gap-5">
            {subCategories.map((sub) => (
              <div key={sub.categoryId} className="flex gap-2.5">
                <button onClick={() => setIsModalOpen(true)}>
                  <CircleMinus className="h-auto w-5 fill-[#D32F2F] text-white" />
                </button>
                <p className="w-[307pxp] flex-auto border border-transparent border-b-[#E0E0E0] text-sm text-black">
                  {sub.categoryName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <AlertModal
            isOpen={true}
            type="delete"
            title="정말 삭제하시겠습니까?"
            description="삭제 후 복구가 불가능합니다."
            confirmText="삭제"
            cancelText="취소"
            onConfirm={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
        {isBottomSheetOpen && (
          <CategoryNameInputBottomSheet
            onClose={() => setIsBottomSheetOpen(false)}
            // 바텀 시트가 열린 버튼 출처에 따라 onSubmit 버튼 분기처리
            onSubmit={() => {
              setSubCategories(subCategories);
              setIsBottomSheetOpen(false);
            }}
          />
        )}
      </EditSubcategoryLayout>
    </>
  );
}
