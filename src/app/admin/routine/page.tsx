'use client';

import { UseAdminPreset } from '@/api/admin/adminRoutinePreset';
import PresetList from '@/app/components/admin/routine/PresetList';
import RoutineSelector from '@/app/components/admin/routine/routineSelector';
import { Suspense } from 'react';

function RoutinePageContent() {
  const { data: presets, isLoading } = UseAdminPreset();
  return (
    <>
      <RoutineSelector />
      <PresetList
        presets={presets}
        onClick={() => console.log('clicked')}
        isLoading={isLoading}
      />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoutinePageContent />
    </Suspense>
  );
}
