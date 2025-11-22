"use client";
import { useToggleContext } from "@/library/contexts/ToggleContextProvider";
import { cn } from "@/library/utils/cn";

interface IContainerWrapperProps {
  className?: string;
  children?: React.ReactNode;
}

const ContainerWrapper = ({ className, children }: IContainerWrapperProps) => {
  const { toggleState: isExpended } = useToggleContext();
  return (
    <div
      className={cn(
        "relative flex h-auto flex-col items-start gap-10 lg:flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContainerWrapper;
