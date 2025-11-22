import { cn } from "@/library/utils/cn";
import Image from "next/image";
import { TNextImageWithOptimization } from "./type";

const WithOptimization = ({
  src,
  alt = "image",
  className,
  imageClassName,
  priority,
  disableBlur,
  blurDataURL,
  style,
  ...restProps
}: TNextImageWithOptimization) => {
  // Add validation
  if (!src) {
    return (
      <div className={cn("relative !z-[0] w-full pt-[100%]")}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">No image</span>
        </div>
      </div>
    );
  }
  return (
    <div className={cn("relative !z-[0] h-full w-full", className)}>
      <Image
        src={src}
        alt={alt}
        width={restProps?.width || 0}
        height={restProps?.height || 0}
        quality={restProps?.quality}
        style={{ objectFit: "contain", zIndex: 0, ...style }}
        className={cn(
          "left-0 top-0 !z-[0] h-full w-full object-contain",
          imageClassName,
        )}
        loading={priority ? undefined : "lazy"}
        priority={priority}
        placeholder={!disableBlur ? "blur" : undefined}
        blurDataURL={!disableBlur ? (blurDataURL ?? undefined) : undefined}
      />
    </div>
  );
};

export default WithOptimization;
