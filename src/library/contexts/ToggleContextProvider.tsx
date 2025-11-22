"use client";
import useToggle from "@/library/hooks/useToggle";
import React, { createContext, memo, useContext } from "react";

type TToggleContextProps = {
  toggleState: boolean;
  setFalse: () => void;
  setTrue: () => void;
  toggle: () => void;
  set: (value: boolean) => () => void;
};

interface IToggleContextProviderProps {
  children: React.ReactNode;
  initialState?: boolean;
}

const ToggleContext = createContext<TToggleContextProps | undefined>(undefined);

const ToggleContextProvider = ({
  children,
  initialState = false,
}: IToggleContextProviderProps) => {
  const toggleContextValues = useToggle(initialState);

  return (
    <ToggleContext.Provider value={toggleContextValues}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggleContext = (): TToggleContextProps => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error(
      "useToggleContext must be used within a ToggleContextProvider",
    );
  }
  return context;
};

export default memo(ToggleContextProvider);
