import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { generateBlurDataUrl } from "@/library/utils/image";

const SopExclusiveImage = async ({
  imageSrc,
  imageAlt,
}: {
  imageSrc?: string;
  imageAlt?: string;
}) => {
  const blurData = await generateBlurDataUrl(imageSrc);

  return (
    <div className="flex flex-col items-center px-5 md:block md:px-0">
      <div className="relative h-fit w-fit shrink-0 md:px-0">
        <NextImage
          src={imageSrc || ""}
          alt={imageAlt || "SOP Exclusive Image"}
          blurDataURL={blurData}
          width={330}
          height={430}
          className="h-[380px] w-[270px] md:h-[430px] md:w-[330px]"
        />

        <div className="absolute bottom-1.5 right-[-8px] !z-[0] h-[348px] w-[262px] border-b-8 border-r-8 border-b-theme-light-golden border-r-theme-light-golden md:-bottom-2 md:-right-2 md:h-[422px] md:w-[322px]" />

        <div className="absolute bottom-[16px] left-0 right-0 !z-[1] h-[98px] bg-[linear-gradient(180deg,rgba(20,18,19,0.00)_0%,rgba(20,18,19,0.80)_66.08%)] md:bottom-0 md:right-0" />

        <Typography className="absolute bottom-6 left-0 right-0 !z-[2] flex justify-center px-2 text-center text-lg font-[250] text-theme-off-white md:text-[18px]">
          {imageAlt}
        </Typography>
      </div>
    </div>
  );
};

export default SopExclusiveImage;
