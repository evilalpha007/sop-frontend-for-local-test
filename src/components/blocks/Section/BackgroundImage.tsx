import NextImage from "@/components/elements/images/NextImage";
import { cn } from "@/library/utils/cn";
import { generateBlurDataUrl } from "@/library/utils/image";

type BackgroundImageProps = {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
};

export default async function BackgroundImage({
  className,
  src,
  alt,
  height,
  width,
  priority,
  quality,
}: Readonly<BackgroundImageProps>) {
  const blurDataURL = await generateBlurDataUrl(src);

  return (
    <div className={cn("absolute inset-0 !-z-20 h-full w-full")}>
      <NextImage
        src={src || ""}
        alt={alt ?? "background image"}
        width={width || 1440}
        height={height || 705}
        priority={priority}
        className={cn("!-z-30 !h-full !w-full !object-cover", className)}
        imageClassName="!object-cover !h-full !w-full"
        blurDataURL={blurDataURL}
        // className={cn(
        //   "absolute inset-0 !-z-20 h-full w-full object-cover opacity-90",
        //   className,
        // )}
        quality={quality}
      />
      {/* <div className="relative !-z-[21] h-full w-full">
        <div className="left-0/ bottom-0/ right-0/ absolute !z-[-1] !h-[100%] w-full bg-red-500# !bg-[linear-gradient(180deg,rgba(20,18,19,0.99)_29%,rgba(73,73,73,0.00)_78.88%)]" />
      </div> */}
    </div>
  );
}
