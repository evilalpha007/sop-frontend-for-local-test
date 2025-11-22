"use client";
import Button from "@/components/elements/buttons/Button";
import { cn } from "@/library/utils/cn";

interface ITabProps {
  className?: string;
  label?: string;
  value?: string | number;
  currentValue?: string | number;
  onClick?: (value: ITabProps["value"]) => void;
  disabled?: boolean;
}

const Tab = ({
  className,
  label,
  value,
  disabled,
  onClick,
  currentValue,
}: ITabProps) => {
  return (
    <Button
      className={cn(
        "mb-2.5 text-sm font-normal text-theme-off-white sm:text-sm md:text-sm",
        {
          "text-theme-light-golden":
            value !== null &&
            value !== undefined &&
            currentValue !== null &&
            currentValue !== undefined &&
            String(value).toLowerCase() === String(currentValue).toLowerCase(),
        },
        className,
      )}
      disabled={disabled}
      onClick={() => onClick?.(value)}
    >
      {label}
    </Button>
  );
};

export default Tab;
