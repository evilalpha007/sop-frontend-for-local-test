"use client";
import useWindowMount from "@/library/hooks/useWindowMount";
import { cn } from "@/library/utils/cn";
import { forwardRef, useId } from "react";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: React.ReactNode;
  requiredSymbol?: boolean;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(
  {
    className,
    type = "text",
    label,
    requiredSymbol,
    labelClassName,
    ...restProps
  }: IInputProps,
  ref,
) {
  const { isMounted } = useWindowMount();
  const formId = useId();

  return (
    <div>
      {!!label && (
        <label
          className={cn(
            "mb-1 inline-block text-[12px] font-medium text-theme-light-golden sm:mb-2 sm:text-sm",
            labelClassName,
          )}
          htmlFor={formId}
        >
          {label} {requiredSymbol && <span className="text-red-500">*</span>}
        </label>
      )}

      {isMounted && (
        <input
          id={formId}
          type={type}
          className={cn(
            "w-full rounded-none border border-solid border-theme-off-white bg-theme-black p-1.5 px-3 text-[12px] font-normal text-theme-off-white outline-none placeholder:text-opacity-50 focus-within:outline-none sm:p-3 sm:text-sm",
            className,
          )}
          ref={ref}
          {...restProps}
        />
      )}
    </div>
  );
});

export default Input;
