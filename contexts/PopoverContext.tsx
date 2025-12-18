"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PopoverContextType {
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export function PopoverProvider({ children }: { children: ReactNode }) {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  return (
    <PopoverContext.Provider value={{ openPopoverId, setOpenPopoverId }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopoverContext must be used within PopoverProvider");
  }
  return context;
}

