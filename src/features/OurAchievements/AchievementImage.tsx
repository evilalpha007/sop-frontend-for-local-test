import NextImage from "@/components/elements/images/NextImage";
import { generateBlurDataUrl } from "@/library/utils/image";

interface IAchievementImageProps {
  id?: string | number;
  imageUrl?: string;
  alt?: string;
}

const AchievementImage = async ({
  alt,
  id,
  imageUrl,
}: IAchievementImageProps) => {
  const blurDataUrl = await generateBlurDataUrl(imageUrl);

  return (
    <div className="px-2.5">
      <NextImage
        src={imageUrl || ""}
        alt={alt || "our-achievement"}
        blurDataURL={blurDataUrl}
        width={271}
        height={376}
        className="sm:max-h-[375px]# sm:max-w-[270px]# h-full w-full flex-grow border border-theme-off-golden object-cover"
      />
    </div>
  );
};

export default AchievementImage;
