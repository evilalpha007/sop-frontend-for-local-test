import NextImage from "@/components/elements/images/NextImage";

interface IThumbnailProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Thumbnail = ({ src, alt, width, height }: IThumbnailProps) => {
  return (
    <div className="relative overflow-hidden">
      <NextImage
        src={src || ""}
        alt={alt || "why-work-with-sop"}
        width={width || 265}
        height={height || 149}
        className="overflow-hidden rounded-[14px]"
      />

      <div className="absolute left-1/2 top-1/2 z-[1] flex h-[31px] w-11 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-[10px] bg-theme-light-golden">
        <NextImage
          src="/svg-icons/why-work-with-sop/play-icon.svg"
          alt="why-work-with-sop"
          width={75}
          height={52}
          className="h-[13.193px] w-[11.453px]"
        />
      </div>
    </div>
  );
};

export default Thumbnail;
