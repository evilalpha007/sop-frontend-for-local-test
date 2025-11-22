import Typography from "@/components/elements/texts/Typography";
import React from "react";

interface IInfoProps {
  writtenBy?: string | null;
  ageFromNow?: string | null;
}

const Info = ({ writtenBy = "N/A", ageFromNow = "N/A" }: IInfoProps) => {
  return (
    <div className="flex gap-2.5">
      <Typography
        as="p"
        className="font-raleway text-xs font-normal not-italic leading-9 text-theme-off-white"
      >
        {writtenBy}
      </Typography>

      <Typography
        as="p"
        className="font-raleway text-xs font-normal not-italic leading-9 text-theme-off-white"
      >
        |
      </Typography>

      <Typography
        as="p"
        className="font-raleway text-xs font-normal not-italic leading-9 text-theme-off-white"
      >
        {ageFromNow}
      </Typography>
    </div>
  );
};

export default Info;
