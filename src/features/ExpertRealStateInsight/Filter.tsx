"use client";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React, { useCallback } from "react";

export interface IFilterItem {
  id: number | string;
  title?: string;
  query?: string;
  // filterSuffix?: string;
}

interface IFilterProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "onClick"
  > {
  info: {
    isActive?: boolean;
    filter: IFilterItem;
    onFilterClick?: (data?: IFilterItem) => void;
  };
}

const Filter = ({
  children,
  className,
  info: { isActive, filter, onFilterClick },
  ...restProps
}: IFilterProps) => {
  const handleClick = useCallback(
    ({
      onFilterClick,
      ...data
    }: IFilterItem & {
      onFilterClick?: (data?: IFilterItem) => void;
    }) => {
      return () => {
        onFilterClick?.(data);
      };
    },
    [],
  );

  return (
    <Typography
      as="li"
      className={cn(
        "relative cursor-pointer text-nowrap disabled:cursor-not-allowed",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:z-[1] after:w-full after:scale-x-0 after:border-b-[3px] after:border-b-theme-off-white after:opacity-0 after:transition-all after:duration-300 after:content-[''] after:hover:scale-x-100 after:hover:opacity-100",
        "text-[22px] font-medium uppercase text-theme-gray hover:text-theme-off-white md:text-[33px]",
        isActive ? "text-theme-light-golden hover:text-theme-light-golden" : "",
        isActive
          ? "after:z-[2] after:scale-x-100 after:border-b-theme-light-golden after:opacity-100"
          : "",
        className,
      )}
      {...restProps}
      onClick={handleClick({
        ...filter,
        onFilterClick,
      })}
    >
      {children}
    </Typography>
  );
};

export default Filter;
