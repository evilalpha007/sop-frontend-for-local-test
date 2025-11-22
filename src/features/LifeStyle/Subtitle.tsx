import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import React from "react";

interface ISubtitleProps {
  title?: string;
  link?: string;
}

const Subtitle = ({ title, link }: ISubtitleProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-3">
      <div className="flex items-center gap-2 bg-theme-black bg-opacity-70 px-[10px] py-4">
        <Typography
          as="h5"
          className="text-sm font-medium text-theme-off-white"
        >
          {title}
        </Typography>

        <div className="h-5 w-0 border-r border-r-theme-off-white" />

        <Link
          href={link || "#"}
          className="text-sm font-medium text-theme-light-golden"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Subtitle;
