import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React from "react";

interface ISelectDropdownProps {
  title?: React.ReactNode;
  className?: string;
}

const Label = ({ title, className }: ISelectDropdownProps) => {
  return (
    <Typography
      as="h6"
      className={cn(
        "mb-2.5 text-sm font-normal text-theme-light-golden",
        className,
      )}
    >
      {title}
    </Typography>
  );
};

export default Label;
