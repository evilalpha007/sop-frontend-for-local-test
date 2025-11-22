import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import React from "react";

export interface ICardProps {
  id: number | string;
  name?: string;
  items?: {
    id: number | string;
    title?: React.ReactNode;
    url?: string;
    target?: React.HTMLAttributeAnchorTarget;
  }[];
}

const Card = ({ name, items }: ICardProps) => {
  return (
    <div className="min-h-[350px] border border-solid border-theme-off-white border-opacity-30 bg-theme-gray bg-opacity-30 sm:min-h-0">
      <div className="mb-[5px] flex items-end gap-x-[5px] px-[15px] pt-[19px] opacity-70">
        <Typography
          as="h3"
          className="flex-shrink-0 text-base font-normal uppercase text-theme-off-white"
        >
          {name}
        </Typography>

        <div className="mb-1 w-full border-b border-solid border-theme-off-white" />
      </div>

      <div className="pb-[19px] pl-7 pr-[15px]">
        <ul className="list-outside list-disc">
          {items?.map((item, idx) => (
            <li
              key={item?.id || idx}
              className="text-xs font-normal leading-[25px] text-theme-off-white opacity-60"
            >
              {"url" in item ? (
                <Link href={item?.url || "#"} target={item?.target}>
                  {item?.title}
                </Link>
              ) : (
                item?.title
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
