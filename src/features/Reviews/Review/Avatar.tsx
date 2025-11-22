import NextImage from "@/components/elements/images/NextImage";
import { cn } from "@/library/utils/cn";
import { generateBlurDataUrl } from "@/library/utils/image";

interface IAvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

const Avatar = async ({ src, alt, className }: IAvatarProps) => {
  const blurDataUrl = await generateBlurDataUrl(src);
  return (
    <NextImage
      src={src || ""}
      alt={alt || "reviewer"}
      blurDataURL={blurDataUrl}
      width={95}
      height={95}
      className={cn(
        "h-[75px] w-[75px] shrink-0 rounded-full sm:h-[94px] sm:w-[94px]",
        className,
      )}
    />
  );
};

export default Avatar;
