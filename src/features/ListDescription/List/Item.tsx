import { cn } from "@/library/utils/cn";
import React from "react";

interface IItemProps {
  className?: string;
  children?: React.ReactNode;
}

const Item = ({ className, children }: IItemProps) => {
  return (
    <li
      className={cn(
        "ml-8 text-lg font-medium leading-10 text-theme-off-white",
        className,
      )}
    >
      {children}
    </li>
  );
};

export default Item;
