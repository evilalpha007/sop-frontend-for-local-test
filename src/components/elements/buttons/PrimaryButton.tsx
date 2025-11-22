import { cn } from "@/library/utils/cn";
import Button, { IButtonProps } from "./Button";

interface IPrimaryButtonProps extends IButtonProps {}

const PrimaryButton = ({ className, ...restProps }: IPrimaryButtonProps) => {
  return (
    <Button
      className={cn(
        "transition-linear disabled:hover:bg-theme-primary/40 rounded-sm bg-theme-light-golden/90 px-[15.375px] py-2 !ease-in-out hover:bg-theme-light-golden/80 active:scale-95 disabled:bg-theme-light-golden/20 sm:py-[10.5px]",
        className,
      )}
      {...restProps}
    />
  );
};

export default PrimaryButton;
