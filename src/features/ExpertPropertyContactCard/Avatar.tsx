import NextImage from "@/components/elements/images/NextImage";
import { cn } from "@/library/utils/cn";
import React from "react";

interface IAvatarProps {
  image?: string;
  alt?: string;
  isActive?: boolean;
  className?: string;
  containerClassName?: string;
}

const Avatar = ({
  image,
  alt,
  className,
  containerClassName,
  isActive,
}: IAvatarProps) => {
  return (
    <div className={cn(containerClassName)}>
      <div className="relative h-fit w-fit">
        <NextImage
          src={image || "/images/logo/primary-logo.svg"}
          alt={alt || "Property Expert"}
          width={220}
          height={220}
          className={cn(
            "h-full max-h-[220px] w-full max-w-[220px] rounded-full",
            className,
          )}
        />

        {!!isActive && (
          <div className="absolute right-[4.73px] top-[9px] size-3.5 rounded-full bg-[#1EDB42]" />
        )}
      </div>
    </div>
  );
};

export default Avatar;
