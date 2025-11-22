import NextImage from "@/components/elements/images/NextImage";
import { generateBlurDataUrl } from "@/library/utils/image";

interface ILargeImageProps {
  src?: string | null;
  alt?: string | null;
}

const LargeImage = async ({ alt, src }: ILargeImageProps) => {
  const blurDataUrl = await generateBlurDataUrl(src);
  return (
    <NextImage
      src={src || ""}
      alt={alt || "blog large image"}
      blurDataURL={blurDataUrl}
      width={534}
      height={458}
      className="max-h-[534px]# h-full w-full flex-grow !object-cover md:max-w-[457px]"
      imageClassName="!object-cover"
    />
  );
};

export default LargeImage;
