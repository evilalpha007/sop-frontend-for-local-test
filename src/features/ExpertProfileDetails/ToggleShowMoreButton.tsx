"use client";
import { useToggleContext } from "@/library/contexts/ToggleContextProvider";
import { cn } from "@/library/utils/cn";

const ToggleShowMoreButton = () => {
  const { toggle, toggleState: isExpended } = useToggleContext();
  return (
    <span
      className={cn(
        "absolute right-2 z-[2] hidden cursor-pointer bg-theme-black p-1.5 text-xs text-theme-off-golden lg:block",
        !isExpended ? "bottom-2" : "bottom-0.5",
      )}
      onClick={toggle}
    >
      {!isExpended ? "Show More" : "Show Less"}
    </span>
  );
};

export default ToggleShowMoreButton;
