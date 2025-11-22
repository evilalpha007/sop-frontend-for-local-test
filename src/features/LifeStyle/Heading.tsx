import Typography from "@/components/elements/texts/Typography";
import React from "react";

interface IHeadingProps {
  title?: string | null;
  description?: string | null;
  className?: string;
}

const Heading = ({ title, description, className }: IHeadingProps) => {
  return (
    <div className={className}>
      <Typography
        as="h2"
        className="text-center text-sm font-medium leading-[23px] sm:mb-3.5 sm:text-[32px] sm:leading-[38px]"
      >
        {title}
      </Typography>

      <Typography className="text-center text-[9px] font-light leading-[14px] sm:text-lg sm:leading-[21px]">
        {description}
      </Typography>
    </div>
  );
};

export default Heading;
