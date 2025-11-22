import { cn } from "@/library/utils/cn";
import React from "react";

const Container = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Container({ children, className = "", ...rest }, ref) {
    return (
      <div
        {...rest}
        className={cn(
          // "container z-[1]"
          "z-[1] mx-auto w-full max-w-[1097px] px-4",
          className,
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

export default Container;
