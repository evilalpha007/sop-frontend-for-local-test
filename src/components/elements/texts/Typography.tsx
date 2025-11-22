

import { cn } from "@/library/utils/cn";
import React, { ElementType } from "react";

type ComponentPropsMap = {
  h1: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h2: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h3: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h4: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h5: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h6: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  p: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >;
  span: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
  label: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  div: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  li: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  ol: React.DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  >;
  a: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
};

type TElementType = keyof ComponentPropsMap;

type TypographyProps<T extends TElementType> = {
  as?: TElementType;
} & ComponentPropsMap[T];

const Typography = <T extends TElementType>({
  as = "p",
  children,
  className,
  ...props
}: TypographyProps<T>) => {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(
        "font-raleway not-italic leading-normal text-theme-off-white",
        {
          "text-[52px] font-light uppercase": Component === "h1",
          "text-[14px] font-medium sm:text-[32px]": Component === "h2",
          "text-lg font-medium": Component === "p" || Component === "li",
        },
        // selectH1ClassName &&
        //   h1Styles[selectH1ClassName as keyof typeof h1Styles],
        // selectH2ClassName &&
        //   h2Styles[selectH2ClassName as keyof typeof h2Styles],
        // selectPClassName && pStyles[selectPClassName as keyof typeof pStyles],
        // selectLiClassName &&
        //   liStyles[selectLiClassName as keyof typeof liStyles],
        className,
      )}
      {...(props as any)}
    >
      {children}
    </Component>
  );
};

export default Typography;
