import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import { generateBlurDataUrl } from "@/library/utils/image";

export interface IFeatureCardProps {
  image?: {
    src?: string;
    alt?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageClassName?: string;
  };
  title?: string;
  description?: string;
}

const FeatureCard = async ({
  title,
  image,
  description,
}: IFeatureCardProps) => {
  const blurDataURL = await generateBlurDataUrl(image?.src);

  return (
    <div className="bg-theme-gray bg-opacity-20 p-7">
      <NextImage
        src={image?.src || ""}
        alt={image?.alt || title || "feature image"}
        width={image?.imageWidth || 120}
        height={image?.imageHeight || 120}
        className={cn("mx-auto h-[98px] w-[90px]", image?.imageClassName)}
        blurDataURL={blurDataURL}
      />

      <Typography
        as="h3"
        className="mb-[11px] mt-[22px] text-center text-xl font-light text-theme-off-white md:text-[25px]"
      >
        {title}
      </Typography>

      <Typography
        as="p"
        className="line-clamp-5 text-center text-base font-light leading-6 text-white text-opacity-70"
      >
        {description}
      </Typography>
    </div>
  );
};

export default FeatureCard;
