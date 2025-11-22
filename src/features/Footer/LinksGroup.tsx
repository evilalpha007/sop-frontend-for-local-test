import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Link from "next/link";
import React from "react";

export interface ILinksGroupProps {
  id: number | string;
  title?: string;
  links?: (
    | {
        id: number | string;
        text?: React.ReactNode;
        link?: string;
        target?: React.HTMLAttributeAnchorTarget;
        className?: string;
      }
    | {
        id: number | string;
        text?: React.ReactNode;
        className?: string;
      }
  )[];
}

const LinksGroup = ({ id, title, links }: ILinksGroupProps) => {
  return (
    <div className={"flex w-full max-w-[230px] flex-col items-start"}>
      <Typography
        as="h3"
        className="text-wrap break-words text-left text-xs font-medium uppercase text-white sm:text-base"
      >
        {title}
      </Typography>

      <div className="!mt-2 sm:!mt-[13px]">
        <ul>
          {links?.map((item, idx) => (
            <li
              className={cn(
                "text-wrap break-words text-[10px] font-normal leading-5 text-theme-off-white opacity-60 sm:text-base sm:leading-[30px]",
                item?.className,
              )}
              key={item?.id || idx}
            >
              {"link" in item ? (
                <Link
                  href={item?.link || "#"}
                  target={item?.target}
                  className="text-wrap break-words hover:underline"
                >
                  {item?.text}
                </Link>
              ) : (
                item?.text
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LinksGroup;
