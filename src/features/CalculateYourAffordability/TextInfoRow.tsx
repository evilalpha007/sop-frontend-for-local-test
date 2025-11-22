import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";

interface ITextInfoRowProps {
  title?: string;
  description?: string;
  className?: string;
}

const TextInfoRow = ({ title, description, className }: ITextInfoRowProps) => {
  return (
    <div
      className={cn(
        "mt-[9px] flex items-center justify-between gap-1 sm:mt-3",
        className,
      )}
    >
      <Typography
        as="p"
        className="text-[12px] font-normal text-theme-off-white sm:text-lg"
      >
        {title}
      </Typography>

      <Typography
        as="p"
        className="text-[12px] font-normal text-theme-off-white sm:text-lg"
      >
        {description}
      </Typography>
    </div>
  );
};

export default TextInfoRow;
