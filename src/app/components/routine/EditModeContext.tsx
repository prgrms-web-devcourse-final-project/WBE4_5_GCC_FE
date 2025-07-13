'use client';
import { createContext, useContext, useState } from 'react';

const EditModeContext = createContext<{
  isEditMode: boolean;
  toggleEditMode: () => void;
}>({
  isEditMode: false,
  toggleEditMode: () => {},
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};
