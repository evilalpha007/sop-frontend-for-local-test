import Section from "@/components/blocks/Section/index";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { generateBlurDataUrl } from "@/library/utils/image";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import InactiveOl from "./InactiveOl";

interface IOrderedListFeatureSectionProps {
  className?: string;
  country?: string;
}

interface IMortgageHomeProps {
  title: string;
  description: string;
  primary_image: string;
  secondary_image: string;
  data: {
    title: string;
  }[];
}

const OrderedListFeatureSection = async ({
  className,
  country,
}: IOrderedListFeatureSectionProps) => {
  const res =
    await nextFetch<TResponse<IMortgageHomeProps | undefined>>(
      `v1/auth/mortgage`,
    );

  const mortgageData = res?.data;

  // Add fallback values in case the mortgageData or its fields are undefined
  const topImageBlurData = mortgageData?.primary_image
    ? await generateBlurDataUrl(mortgageData.primary_image)
    : "";
  const bottomImageBlurData = mortgageData?.secondary_image
    ? await generateBlurDataUrl(mortgageData.secondary_image)
    : "";

  return (
    <Section.Container className={className}>
      <div>
        <Typography
          as="h2"
          className="mb-2.5 text-center text-sm font-medium text-theme-off-white md:text-[32px]"
        >
          {mortgageData?.title || "Default Title"}
        </Typography>
        <Typography
          as="h2"
          className="mx-auto mb-[19px] mt-8 w-full max-w-[627px] text-center text-[9px] font-normal leading-[25px] text-theme-off-white md:mb-8 md:text-lg"
        >
          {mortgageData?.description || "Default description goes here."}
        </Typography>
      </div>
      <div className="flex flex-col-reverse items-center justify-between gap-x-[100px] gap-y-[23px] bg-theme-gray bg-opacity-20 px-[15px] pb-[30px] pt-[34px] md:pb-[34px] md:pl-[47px] md:pr-[42px] md:pt-[34px] lg:flex-row">
        <div>
          {mortgageData?.data &&
            mortgageData.data.length > 0 &&
            mortgageData.data.map((item, index) => (
              <InactiveOl
                key={index}
                serialNo={String(index + 1)}
                title={item.title}
              />
            ))}
        </div>

        <div className="mt-12">
          <div className="relative w-fit">
            <NextImage
              src={mortgageData?.primary_image || ""}
              alt="Top"
              blurDataURL={topImageBlurData}
              width={494}
              height={293}
              className="absolute bottom-[10px] right-[9px] !z-[10] h-[163px] w-[278px] md:bottom-[29px] md:right-[31px] md:h-[317px] md:w-[486px]"
            />

            <NextImage
              src={mortgageData?.secondary_image || ""}
              alt="Top"
              blurDataURL={bottomImageBlurData}
              width={494}
              height={293}
              className="z-[0] h-[163px] w-[278px] md:h-[293px] md:w-[440px]"
            />
          </div>
        </div>
      </div>
    </Section.Container>
  );
};

export default OrderedListFeatureSection;
