import OutlineButton from "@/components/elements/buttons/OutlineButton";
import { cn } from "@/library/utils/cn";
import React from "react";

interface IMoreButtonProps {
  children?: React.ReactNode;
  className?: string;
  position?: "left" | "center" | "right";
}

const MoreButton = ({
  className,
  position = "center",
  children,
}: IMoreButtonProps) => {
  return (
    <div
      className={cn("flex justify-center", {
        "justify-start": position === "left",
        "justify-center": position === "center",
        "justify-end": position === "right",
        className,
      })}
    >
      <OutlineButton className="shrink-0 border border-solid border-theme-off-white px-8 py-2 text-sm">
        {children}
      </OutlineButton>
    </div>
  );
};

export default MoreButton;
