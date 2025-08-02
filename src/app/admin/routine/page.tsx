'use client';

import {
  UseAdminPreset,
  addPreset,
  deletePreset,
} from '@/api/admin/adminRoutinePreset';
import PresetList from '@/app/components/admin/routine/PresetList';
import RoutineSelector from '@/app/components/admin/routine/routineSelector';
import { useState, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Preset } from '@/app/components/routine/RecommendedRoutine';
import AlertModal from '@/app/components/common/alert/AlertModal';
import AddPresetBottomSheet from '@/app/components/admin/routine/AddPresetBottomSheet';

export default function AdminRoutine() {
  const { data: presets, isLoading } = UseAdminPreset();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [showAddSheet, setShowAddSheet] = useState(false);

  const [checkDelete, setCheckDelete] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: (presetId: number) => deletePreset(presetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-preset'] });
    },
  });

  const { mutate: handleAdd } = useMutation({
    mutationFn: addPreset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-preset'] }); // 새로고침
    },
  });

  const filteredPresets = useMemo(() => {
    if (!presets) return [];
    if (selectedCategoryId === null) return presets;
    return presets.filter(
      (preset: Preset) => preset.categoryId === selectedCategoryId,
    );
  }, [presets, selectedCategoryId]);

  return (
    <>
      <RoutineSelector
        selectedCategoryId={selectedCategoryId}
        selectAction={setSelectedCategoryId}
      />
      <PresetList
        presets={filteredPresets}
        onClick={(preset) => console.log('clicked', preset)}
        onDelete={(presetId) => {
          setCheckDelete(true);
          setDeleteTargetId(presetId);
        }}
        isLoading={isLoading}
      />
      {selectedCategoryId !== null && (
        <div
          onClick={() => setShowAddSheet(true)}
          className="mt-3 flex h-11 w-full cursor-pointer items-center justify-center rounded-[8px] border-2 border-dashed border-[var(--gray-300)] text-[14px] font-medium text-[var(--black)] dark:text-[var(--dark-gray-700)]"
        >
          + 추가하기
        </div>
      )}

      {showAddSheet && (
        <AddPresetBottomSheet
          onCloseAction={() => setShowAddSheet(false)}
          onSaveAction={(name) =>
            handleAdd({
              categoryId: selectedCategoryId!,
              name,
              triggerTime: '08:00',
              isImportant: false,
              repeatType: 'DAILY',
              repeatValue: '1',
              repeatTerm: 1,
            })
          }
        />
      )}

      {checkDelete && (
        <AlertModal
          type="delete"
          title="루틴 프리셋을 삭제하시겠어요?"
          onConfirm={() => {
            if (deleteTargetId !== null) {
              handleDelete(deleteTargetId);
              setDeleteTargetId(null);
              setCheckDelete(false);
            }
          }}
          cancelText="취소"
          onCancel={() => setCheckDelete(false)}
          isOpen={checkDelete}
        />
      )}
    </>
  );
}
