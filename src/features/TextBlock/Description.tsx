import Typography from "@/components/elements/texts/Typography";
import React from "react";
import { IDescriptionProps } from "./type";
import { cn } from "@/library/utils/cn";

const Description = ({ children, className }: IDescriptionProps) => {
  return (
    <Typography
      as="p"
      className={cn(
        "text-lg font-medium not-italic leading-[30px] text-theme-off-white text-opacity-70",
        className,
      )}
    >
      {children}
    </Typography>
  );
};

export default Description;
