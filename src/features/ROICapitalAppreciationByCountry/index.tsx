import Section from "@/components/blocks/Section";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { generateBlurDataUrl } from "@/library/utils/image";

const ROICapitalAppreciationByCountry = async () => {
  const imageUrl = "/images/non-residents/roi-capital-appreciation.webp";
  const blurDataUrl = await generateBlurDataUrl(imageUrl);

  return (
    <Section.Container className="">
      <Typography
        as="h2"
        className="mb-[23px] text-center text-xl font-light leading-normal text-theme-light-golden md:text-2xl lg:text-[32px]"
      >
        ROI & Capital Appreciation by country
      </Typography>

      <Typography
        as="p"
        className="text-center text-sm font-light text-theme-off-white md:leading-10 lg:text-xl"
      >
        Comparative Analysis of ROI and Capital Growth in Top Real Estate
        Markets
      </Typography>

      <div className="mt-7">
        {/* image */}
        <NextImage
          width={1065}
          height={632}
          src={imageUrl}
          blurDataURL={blurDataUrl}
          alt="hero"
          className="w-full"
          quality={100}
          // unoptimized
        />
      </div>
    </Section.Container>
  );
};

export default ROICapitalAppreciationByCountry;
