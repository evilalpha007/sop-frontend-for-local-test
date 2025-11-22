import { cn } from "@/library/utils/cn";
import React from "react";
import ListRows from "./ListRows";

interface IListRowsGroupProps {
  className?: string;
  children?: React.ReactNode;
  maxColumns?: "1" | "2" | "3" | "4";
  gap?: "18px" | "none";
}

const ListRowsGroup = ({
  className,
  children,
  maxColumns = "2",
  gap = "18px",
}: IListRowsGroupProps) => {
  return (
    <div
      className={cn(
        "grid gap-3 md:grid-cols-2 md:gap-[18px]",
        {
          "gap-[18px]": gap === "18px",
          "gap-0": gap === "none",
        },
        {
          "sm:grid-cols-1 md:grid-cols-1": maxColumns === "1",
          "md:grid-cols-2": maxColumns === "2",
          "lg:grid-cols-3": maxColumns === "3",
          "xl:grid-cols-4": maxColumns === "4",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

ListRowsGroup.ListRows = ListRows;

export default ListRowsGroup;
