import { cn } from "@/library/utils/cn";
import React from "react";

export default function H1({
  className,
  children,
  ...rest
}: React.ComponentProps<"h1">) {
  return (
    <h1
      {...rest}
      className={cn(
        `text-2xl font-bold leading-[2.275rem] max-lg:mx-auto max-lg:text-center sm:text-[2rem] sm:leading-[2.575rem] md:text-4xl md:leading-[3.25rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-5xl xl:leading-[4rem] 2xl:text-[3.25rem] 2xl:leading-[4.25rem]`,
        className,
      )}
    >
      {children}
    </h1>
  );
}
