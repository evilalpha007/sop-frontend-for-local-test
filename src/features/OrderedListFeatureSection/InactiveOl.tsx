import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React from "react";

interface IInactiveOlProps {
  className?: string;
  serialNo: string;
  title: string;
}

const InactiveOl = ({ className, serialNo, title }: IInactiveOlProps) => {
  return (
    <div className={cn("flex items-end gap-3.5", className)}>
      <Typography
        as="h4"
        className="text-[65px] font-light text-theme-off-white text-opacity-20 md:text-[63px]"
      >
        {serialNo}
      </Typography>

      <div>
        <Typography
          as="p"
          className="mb-4 text-sm font-light text-theme-off-white md:text-xl"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default InactiveOl;
