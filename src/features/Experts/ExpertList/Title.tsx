import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";

interface ITitleProps {
  className?: string;
  title?: string;
}

const Title = ({ className, title }: ITitleProps) => {
  return (
    <Typography
      as="h2"
      className={cn(
        "mb-4 text-center text-xl font-light text-theme-light-golden md:text-[32px]",
        className,
      )}
    >
      {title}
    </Typography>
  );
};

export default Title;
