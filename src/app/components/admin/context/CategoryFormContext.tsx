'use client';

import { createContext, useContext, useState } from 'react';

interface CategoryFormContextProps {
  //emoji: string | null;
  //setEmoji: (emoji: string | null) => void;
  name: string;
  setName: (name: string) => void;
}

const CategoryFormContext = createContext<CategoryFormContextProps | undefined>(
  undefined,
);

export const useCategoryForm = () => {
  const context = useContext(CategoryFormContext);
  if (!context) {
    throw new Error(
      'useCategoryForm은 CategoryFormProvider 내부에서만 사용되어야 함.',
    );
  }
  return context;
};

export const CategoryFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const [emoji, setEmoji] = useState<string | null>(null);
  const [name, setName] = useState<string>('');

  return (
    <CategoryFormContext.Provider value={{ name, setName }}>
      {children}
    </CategoryFormContext.Provider>
  );
};
