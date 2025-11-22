import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React from "react";

interface IParagraphProps {
  className?: string;
  children?: React.ReactNode;
}

const Paragraph = ({ className, children }: IParagraphProps) => {
  return (
    <Typography
      as="p"
      className={cn(
        "my-0.5 text-lg font-medium leading-10 text-theme-off-white",
        className,
      )}
    >
      {children}
    </Typography>
  );
};

export default Paragraph;
