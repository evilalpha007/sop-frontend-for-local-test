import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React from "react";

interface ITitleProps {
  className?: string;
  children?: React.ReactNode;
}

const Title = ({ className, children }: ITitleProps) => {
  return (
    <Typography
      as="h2"
      className={cn(
        "mb-6 mt-[68px] text-left text-[32px] font-medium text-theme-off-white",
        className,
      )}
    >
      {children}
    </Typography>
  );
};

export default Title;
