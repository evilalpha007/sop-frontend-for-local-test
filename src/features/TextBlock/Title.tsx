import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import { ITitleProps } from "./type";

const Title = ({ children, className }: ITitleProps) => {
  return (
    <Typography
      as="h3"
      className={cn(
        "mb-4 inline-block text-center text-[26px] font-normal text-theme-light-golden",
        className,
      )}
    >
      {children}
    </Typography>
  );
};

export default Title;
