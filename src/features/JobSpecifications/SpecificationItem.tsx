import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";

interface ISpecificationItemProps {
  className?: string;
  image?: string;
  alt?: string;
  title?: string;
  disableEndVr?: boolean;
}
const SpecificationItem = ({
  className,
  image,
  alt,
  title,
  disableEndVr,
}: ISpecificationItemProps) => {
  return (
    <div className="flex w-full flex-grow items-start justify-between gap-2">
      <div className="flex w-full flex-1 cursor-pointer flex-col items-center gap-3 px-2">
        <NextImage
          src={image || ""}
          alt={alt || "Salary Icon"}
          width={32}
          height={32}
          disableBlur
          className="size-8 shrink-0"
        />

        <Typography className="mx-auto max-w-[120px] text-center text-sm font-medium not-italic leading-[18px] text-white">
          {title}
        </Typography>
      </div>

      {!disableEndVr && (
        <div className="h-[84px] w-0 border-r border-r-theme-off-white border-opacity-50" />
      )}
    </div>
  );
};

export default SpecificationItem;
