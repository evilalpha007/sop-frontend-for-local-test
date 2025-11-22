"use client";
import { cn } from "@/library/utils/cn";
import { memo, useCallback, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SmoothHeightAnimation from "../SmoothHeightAnimation";
import {
  IAccordionContextProps,
  useAccordionContext,
} from "./AccordionContext";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  initialIsOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  initialIsOpen,
}) => {
  const { isCommonOpen, setIsCommonOpen, individual } = useAccordionContext();
  const [isIndividualOpen, setIsIndividualOpen] = useState(initialIsOpen);
  const isOpen = individual ? isIndividualOpen : isCommonOpen === title;

  const toggleAccordion = useCallback(
    ({
      setIsCommonOpen,
      individual,
      title,
    }: IAccordionContextProps & { title: string }) => {
      return () => {
        if (individual) {
          setIsIndividualOpen((prev) => !prev);
        } else {
          setIsCommonOpen((prev) => (prev === title ? null : title));
        }
      };
    },
    [],
  );

  useEffect(() => {
    if (!individual && initialIsOpen) {
      setIsCommonOpen(title);
    }
  }, [individual, initialIsOpen, setIsCommonOpen, title]);

  return (
    <div>
      <button
        className={cn(
          "transition-linear flex w-full items-center justify-between gap-2 border-none bg-theme-green-gray bg-opacity-20 px-4 py-3.5 text-left outline-none ring-0 duration-500 focus-within:border-none focus-within:outline-none focus-within:ring-0 focus:border-none focus:outline-none focus:ring-0 active:border-none active:outline-none sm:gap-3 sm:px-7 sm:py-[18px]",
          {
            "bg-theme-light-golden bg-opacity-20": isOpen,
          },
        )}
        onClick={toggleAccordion({
          isCommonOpen,
          setIsCommonOpen,
          individual,
          title,
        })}
      >
        <span className="text-wrap break-words text-[12px] font-light sm:text-2xl">
          {title}
        </span>

        <IoIosArrowDown
          className={`size-3.5 shrink-0 transform transition-transform duration-500 sm:size-5 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <SmoothHeightAnimation open={isOpen}>
        <SmoothHeightAnimation.ContentContainer>
          <div className="max-h-[80dvh] overflow-y-auto">{children}</div>
        </SmoothHeightAnimation.ContentContainer>
      </SmoothHeightAnimation>
    </div>
  );
};

export default memo(Accordion);
