"use client";
import NextImage from "@/components/elements/images/NextImage";
import Link from "next/link";
import React from "react";

export interface ILinkIconProps {
  id: string | number;
  icon: string;
  alt: string;
  link: string;
  target?: React.HTMLAttributeAnchorTarget;
  width?: number;
  height?: number;
  external?: boolean;
  onClick?: () => void;
}

const LinkIcon = ({
  icon,
  alt,
  link,
  target,
  external,
  onClick,
}: ILinkIconProps) => {
  const Component = external ? "a" : Link;

  return (
    <Component href={link} target={target} onClick={onClick ?? undefined}>
      <NextImage
        src={icon || " "}
        alt={alt}
        width={19}
        height={19}
        className="h-[19px] w-[19px]"
        disableBlur
      />
    </Component>
  );
};

export default LinkIcon;
