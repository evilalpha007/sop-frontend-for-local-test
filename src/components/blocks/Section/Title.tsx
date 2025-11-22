import { cn } from "@/library/utils/cn";
import React from "react";

export default function Title({
  className,
  children,
  ...rest
}: React.ComponentProps<"h2">) {
  return (
    <h2
      {...rest}
      className={cn(
        "font-heading mx-auto text-center text-lg font-bold leading-8 text-black sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[2.75rem] xl:text-5xl xl:leading-[4rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
