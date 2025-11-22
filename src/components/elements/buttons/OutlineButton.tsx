import { cn } from "@/library/utils/cn";
import Button, { IButtonProps } from "./Button";

interface IOutlineButtonProps extends IButtonProps {}

const OutlineButton = ({ className, ...restProps }: IOutlineButtonProps) => {
  return (
    <Button
      className={cn(
        "transition-linear text-theme-primary rounded-sm border border-theme-light-golden px-[15.375px] py-[10.5px] text-theme-off-white !ease-in-out hover:bg-theme-light-golden/10 active:scale-95",
        className,
      )}
      {...restProps}
    />
  );
};

export default OutlineButton;
