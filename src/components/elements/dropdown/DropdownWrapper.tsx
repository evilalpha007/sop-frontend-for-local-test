"use client";
import SmoothHeightAnimation from "@/components/elements/SmoothHeightAnimation";
import { useToggleContext } from "@/library/contexts/ToggleContextProvider";
import { useOutsideClick } from "@/library/hooks/useOutsideClick";
import { cn } from "@/library/utils/cn";
import FilterTitle from "./FilterTitle";

interface IDropdownWrapperProps {
  title: React.ReactNode;
  children: React.ReactNode;
  enableHoverMode?: boolean;
  minW?: boolean;
}

const DropdownWrapper = ({
  title,
  children,
  enableHoverMode,
  minW = true,
}: IDropdownWrapperProps) => {
  const {
    toggleState: isOpen,
    toggle: handleToggle,
    setFalse: handleClose,
    setTrue: handleOpen,
  } = useToggleContext();

  const { ref } = useOutsideClick<HTMLDivElement>({
    onOutsideClick: handleClose,
  });

  return (
    <div className="group relative w-fit max-w-full" ref={ref}>
      <FilterTitle
        title={title}
        isExpended={isOpen}
        onClick={handleToggle}
        groupHoverMode={enableHoverMode}
      />

      <div
        className={cn(
          "pt-2 lg:absolute lg:right-0.5 lg:top-10 lg:!z-[2] lg:h-full lg:w-full",
          minW && "lg:min-w-56",
        )}
      >
        <SmoothHeightAnimation
          open={isOpen}
          className={cn("rounded-md bg-white shadow-md")}
          groupHoverMode={enableHoverMode}
        >
          {children}
        </SmoothHeightAnimation>
      </div>
    </div>
  );
};

export default DropdownWrapper;
