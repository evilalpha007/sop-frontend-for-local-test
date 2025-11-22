import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";

interface ITextHeadRowProps {
  title?: string;
  description?: string;
  className?: string;
}

const TextHeadRow = ({ className, description, title }: ITextHeadRowProps) => {
  return (
    <div
      className={cn(
        "mb-[9px] flex items-center justify-between gap-1",
        className,
      )}
    >
      <Typography
        as="h4"
        className="text-[12px] font-medium text-theme-off-white sm:text-lg"
      >
        {title}
      </Typography>

      <Typography
        as="h4"
        className="font-roboto text-[14px] font-medium text-theme-light-golden sm:text-2xl"
      >
        {description}
      </Typography>
    </div>
  );
};

export default TextHeadRow;
