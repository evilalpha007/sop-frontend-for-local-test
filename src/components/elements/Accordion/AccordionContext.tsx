"use client";
import { createContext, useContext, useMemo, useState } from "react";

export interface IAccordionContextProps {
  isCommonOpen: string | null;
  setIsCommonOpen: React.Dispatch<React.SetStateAction<string | null>>;
  individual?: boolean;
}

const AccordionContext = createContext<IAccordionContextProps | undefined>(
  undefined,
);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "useAccordionContext must be used within an AccordionProvider",
    );
  }
  return context;
};

interface AccordionProviderProps {
  children: React.ReactNode;
  individual?: boolean;
}

export const AccordionProvider: React.FC<AccordionProviderProps> = ({
  children,
  individual = false,
}) => {
  const [isCommonOpen, setIsCommonOpen] = useState<string | null>(null);
  const memorizedValue = useMemo(() => {
    return { isCommonOpen, setIsCommonOpen, individual };
  }, [isCommonOpen, individual]);

  return (
    <AccordionContext.Provider value={memorizedValue}>
      {children}
    </AccordionContext.Provider>
  );
};
