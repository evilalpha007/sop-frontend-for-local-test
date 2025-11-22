import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React from "react";

interface ITitleProps {
  className?: string;
  title?: string;
}

const Title = ({ className, title }: ITitleProps) => {
  return (
    <Typography
      as="h2"
      className={cn(
        "mb-4 text-center text-[32px] font-light text-theme-light-golden",
        className,
      )}
    >
      {title}
    </Typography>
  );
};

export default Title;
