import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";

interface ITitleProps {
  title?: string | null;
  className?: string;
}

const Title = ({ title, className }: ITitleProps) => {
  return (
    <div className={cn("gap-3# flex", className)}>
      <Typography
        as="span"
        className="font-roboto text-lg font-normal lowercase not-italic leading-10 text-theme-off-white md:text-xl lg:text-[54px]"
      >
        “
      </Typography>

      <Typography
        as="h2"
        className={cn(
          "relative text-wrap break-words font-raleway text-lg font-normal uppercase leading-10 text-white md:text-xl lg:text-[32px]",
          // "after:absolute after:top-0 after:right-0 after:w-fit after:content-['“'] after:rotate-180 after:font-roboto after:text-[56px] after:lowercase after:leading-10 after:text-theme-off-white"
        )}
      >
        {title}
      </Typography>

      <Typography
        as="span"
        className="rotate-180 font-roboto text-lg lowercase leading-10 text-theme-off-white md:text-xl lg:text-[56px]"
      >
        “
      </Typography>
    </div>
  );
};

export default Title;
