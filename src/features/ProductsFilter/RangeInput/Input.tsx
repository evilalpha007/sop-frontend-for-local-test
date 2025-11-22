import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import React from "react";

interface IInputProps {
  prefix?: string;
  prefixClassName?: string;
  className?: string;
  containerClassName?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly?: boolean;
}

const Input = ({
  prefix,
  prefixClassName,
  className,
  containerClassName,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  readonly,
}: IInputProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border border-solid border-theme-off-white px-3 py-2.5",
        containerClassName,
      )}
    >
      <Typography
        className={cn(
          "pr-4 text-sm font-normal text-theme-off-white",
          prefixClassName,
        )}
      >
        {prefix}
      </Typography>

      <input
        type={type}
        className={cn(
          "!m-0 h-full w-full bg-transparent !p-0 outline-none placeholder:text-sm placeholder:font-normal placeholder:text-theme-off-white placeholder:text-opacity-50 focus-within:outline-none focus:outline-none",
          className,
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readonly}
      />
    </div>
  );
};

export default Input;
