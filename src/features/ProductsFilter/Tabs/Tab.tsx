"use client";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React, { useCallback } from "react";

export interface ITabItem {
  id: number | string;
  title?: string;
  query?: string;
  filterSuffix?: string;
  value?: number;
}

interface ITabProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "onClick"
  > {
  info: {
    isActive?: boolean;
    filter: ITabItem;
    onTabClick?: (data?: ITabItem) => void;
  };
}

const Tab = ({
  children,
  className,
  info: { isActive, filter, onTabClick },
  ...restProps
}: ITabProps) => {
  const handleClick = useCallback(
    ({
      onTabClick,
      ...data
    }: ITabItem & {
      onTabClick?: (data?: ITabItem) => void;
    }) => {
      return () => {
        onTabClick?.(data);
      };
    },
    [],
  );

  return (
    <>
      <Typography
        as="li"
        className={cn(
          "relative cursor-pointer px-2.5 disabled:cursor-not-allowed",
          "after:absolute after:-bottom-1 after:left-0 after:right-0 after:w-full after:scale-x-0 after:border-b-[3px] after:border-b-theme-off-white after:opacity-0 after:transition-all after:duration-300 after:content-[''] after:hover:scale-x-100 after:hover:opacity-100",
          "text-sm font-light text-theme-off-white text-opacity-50 sm:text-base",
          isActive ? "text-theme-light-golden text-opacity-100" : "",
          isActive
            ? "after:scale-x-100 after:border-b-theme-light-golden after:opacity-100"
            : "",
          className,
        )}
        {...restProps}
        onClick={handleClick({
          ...filter,
          onTabClick,
        })}
      >
        {children}
      </Typography>
    </>
  );
};

export default Tab;
