"use client";
import useIsomorphicLayoutEffect from "@/library/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/library/utils/cn";
import React from "react";

const HeroContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function Container({ children, className = "", ...rest }, ref) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      const headerHeight =
        document.querySelector("header#header")?.clientHeight;

      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--data-margin-top",
          `${headerHeight}px`,
        );
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      {...rest}
      className={cn("container# mt-[var(--data-margin-top)]", className)}
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
    >
      {children}
    </div>
  );
});

export default HeroContainer;
