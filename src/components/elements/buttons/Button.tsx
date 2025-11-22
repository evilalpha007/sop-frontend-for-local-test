import { cn } from "@/library/utils/cn";
import { Children, cloneElement } from "react";
import { THtmlButtonProps } from "./type";

export interface IButtonProps extends THtmlButtonProps {
  asChild?: boolean;
}

const Button = ({
  type = "button",
  children,
  className,
  asChild = false,
  ...restProps
}: IButtonProps) => {
  const buttonClass = cn(
    "cursor-pointer select-text text-[12px] font-normal text-theme-black disabled:scale-100 disabled:cursor-not-allowed sm:text-base sm:font-medium",
    className,
  );

  if (asChild) {
    return cloneElement(Children.only(children as React.ReactElement), {
      className: buttonClass,
      ...restProps,
    });
  }

  return (
    <button
      className={cn(
        "cursor-pointer select-text text-[12px] font-normal text-theme-black disabled:scale-100 disabled:cursor-not-allowed sm:text-base sm:font-medium",
        className,
      )}
      type={type}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
