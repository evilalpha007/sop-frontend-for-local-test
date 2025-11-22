import Button from "@/components/elements/buttons/Button";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Link from "next/link";
import React from "react";

export type TText = {
  descriptionAs?: "text";
};

export type TLink = {
  descriptionAs?: "link";
  link?: string;
  target?: React.HTMLAttributeAnchorTarget;
};

export type TButton = {
  descriptionAs?: "button";
  onClick?: (id?: string | number) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export type TDescriptionAs = TText | TLink | TButton;

export type TListRowProps = {
  type?: "header" | "row";
  id?: string | number;
  iconImageSrc?: string | null;
  iconTitleGap?: "10px" | "20px";
  title?: string | null;
  description?: string | null;
} & TDescriptionAs;

type THandleClick = ({
  onClick,
  id,
}: {
  id?: string | number;
  onClick?: TButton["onClick"];
}) => () => void;

const ListRow = ({
  type = "row",
  title,
  description,
  iconImageSrc = "/svg-icons/property/rounded-triangle-arrow.svg",
  iconTitleGap = "10px",
  descriptionAs = "text",
  index,
  ...restProps
}: TListRowProps & { index: number }) => {
  let descriptionContent = null;
  if (descriptionAs === "text") {
    descriptionContent = (
      <Typography
        as="p"
        className="text-nowrap break-words text-[12px] font-light text-white md:text-lg"
      >
        {description}
      </Typography>
    );
  } else if (descriptionAs === "link") {
    const { link, target } = (restProps || {}) as TLink;

    descriptionContent = (
      <Link
        href={link || "#"}
        className="text-nowrap break-words text-sm font-light text-white hover:underline md:text-lg"
        target={target}
        rel="noreferrer"
      >
        {description}
      </Link>
    );
  } else if (descriptionAs === "button") {
    const { onClick, type = "button", disabled } = (restProps || {}) as TButton;

    const handleClick: THandleClick = ({ onClick, id }) => {
      return () => {
        onClick?.(id);
      };
    };

    descriptionContent = (
      <Button
        className={cn(
          "text-nowrap break-words text-lg font-light text-white",
          "hover:underline",
        )}
        onClick={handleClick({ onClick, id: restProps.id })}
        disabled={disabled}
        type={type}
      >
        {description}
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-[26px] py-5",
        "border-b border-solid border-b-theme-off-white border-opacity-20",
        index === 0
          ? "border-t border-solid border-t-theme-off-white border-opacity-20"
          : "",
        {
          "!border-y border-solid !border-y-theme-light-golden bg-[#333232]":
            type === "header",
        },
      )}
    >
      <div
        className={cn("flex w-full items-center", {
          "gap-[10px]": iconTitleGap === "10px",
          "gap-4": iconTitleGap === "20px",
        })}
      >
        {type === "row" && (
          <NextImage
            src={iconImageSrc || ""}
            alt="list icon"
            width={22}
            height={20}
            disableBlur
            className="h-[30px] w-3 shrink-0 md:w-[30px]"
          />
        )}

        {!!title && (
          <Typography
            as="h4"
            className={cn("text-[12px] font-light text-white md:text-lg", {
              "w-full text-center text-[22px] font-medium text-theme-light-golden":
                type === "header",
            })}
          >
            {title}
          </Typography>
        )}
      </div>

      {type === "row" && descriptionContent}
    </div>
  );
};

export default ListRow;
