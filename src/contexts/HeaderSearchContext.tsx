"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderSearchContextType {
  showHeaderSearch: boolean;
  setShowHeaderSearch: (show: boolean) => void;
}

const HeaderSearchContext = createContext<HeaderSearchContextType | undefined>(undefined);

export const HeaderSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);

  return (
    <HeaderSearchContext.Provider value={{ showHeaderSearch, setShowHeaderSearch }}>
      {children}
    </HeaderSearchContext.Provider>
  );
};

export const useHeaderSearch = () => {
  const context = useContext(HeaderSearchContext);
  if (!context) {
    throw new Error('useHeaderSearch must be used within a HeaderSearchProvider');
  }
  return context;
};