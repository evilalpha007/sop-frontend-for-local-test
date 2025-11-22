import { cn } from "@/library/utils/cn";
import Button, { IButtonProps } from "./Button";

interface ISecondaryButtonProps extends IButtonProps {}

const SecondaryButton = ({
  className,
  ...restProps
}: ISecondaryButtonProps) => {
  return (
    <Button
      className={cn(
        "transition-linear rounded-sm bg-theme-gray px-[15.375px] py-[10.5px] text-theme-off-white !ease-in-out hover:bg-theme-gray/90 active:scale-95 disabled:bg-theme-gray/20 disabled:hover:bg-theme-gray/20",
        className,
      )}
      {...restProps}
    />
  );
};

export default SecondaryButton;
