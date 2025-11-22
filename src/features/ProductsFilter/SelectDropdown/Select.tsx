import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";

interface ISelectProps {
  value?: string | number | null;
  placeholder?: string;
  placeholderClassName?: string;
  className?: string;
}

const Select = ({
  value,
  placeholder,
  className,
  placeholderClassName,
}: ISelectProps) => {
  return (
    <div className="flex items-center gap-3 border border-solid border-theme-off-white px-3 py-2">
      <Typography
        className={cn("text-sm font-normal text-theme-off-white", className)}
      >
        {value}
        {!!placeholder && value === null && value === undefined && (
          <Typography
            as="span"
            className={cn(
              "text-sm font-normal text-theme-off-white text-opacity-50",
              placeholderClassName,
            )}
          >
            {placeholder}
          </Typography>
        )}
      </Typography>

      <NextImage
        src="/svg-icons/property/arrow-down.svg"
        alt="Arrow down"
        width={9}
        height={5}
        className="size-[7px] shrink-0 cursor-pointer"
        disableBlur
      />
    </div>
  );
};

export default Select;
