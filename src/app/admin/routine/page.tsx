import PresetList from '@/app/components/admin/routine/PresetList';
import RoutineSelector from '@/app/components/admin/routine/routineSelector';

export default function routineManager() {
  return (
    <>
      <RoutineSelector />
      <PresetList />
    </>
  );
}
