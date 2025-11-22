import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React from "react";

interface ITitleProps {
  title?: string;
  className?: string;
}

const Title = ({ title, className }: ITitleProps) => {
  return (
    <div className="mb-[9px] flex w-full items-end gap-0.5">
      <Typography
        as="h5"
        className={cn(
          "flex-shrink-0 text-base font-normal text-theme-off-white md:text-xl",
          className,
        )}
      >
        {title}
      </Typography>

      <div className="mb-1.5 h-[1px] w-full flex-grow bg-theme-light-golden bg-[linear-gradient(90deg,rgba(199,165,122,1)_0%,rgba(0,0,0,1)_100%)]" />
    </div>
  );
};

export default Title;
