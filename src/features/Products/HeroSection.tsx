import Section from "@/components/blocks/Section";
import NextImage from "@/components/elements/images/NextImage";
import { FiClock } from "react-icons/fi";
import BreadCrumb from "../BreadCrumb";
import ExpertPropertyContactCard from "../ExpertPropertyContactCard";
import Title from "../TextBlock/Title";
import VerticalAd from "../VerticalAd";
import PricingBox from "./PricingBox";
import ProductDetailsHeroSlider from "./ProductDetailsHeroSlider";

interface IHeroSectionProps {
  data?: any;
  propertySliderImages:
    | {
        id: number;
        image: string;
        blurDataUrl: string;
      }[]
    | null
    | undefined;
  info: {
    title: string;
    price: string;
    size: string;
    bedrooms: number;
    washrooms: number;
    address: string;
  };
  country?: string;
  slug?: string;
}

const HeroSection = ({
  data,
  propertySliderImages,
  info,
  country,
  slug,
}: IHeroSectionProps) => {
  const breadcrumbData = [
    {
      title: data?.breadcrumb?.city,
    },
    {
      title: data?.breadcrumb?.main_category,
    },
    {
      title: data?.breadcrumb?.community,
    },
    {
      title: data?.breadcrumb?.area,
    },
    {
      title: data?.breadcrumb?.developer,
    },
    {
      title: data?.breadcrumb?.property_type,
    },
    {
      title: data?.breadcrumb?.title,
    },
  ];
  return (
    <Section>
      <Section.HeroContainer>
        <Section.Container className="2xl:max-w-[1200px]">
          <BreadCrumb data={breadcrumbData} className="mb-5" />

          <div className="flex w-full flex-col items-start justify-start gap-7 lg:flex-row">
            <div className="w-full lg:w-[77%]">
              <ProductDetailsHeroSlider data={data} />
              {/* info box */}
              <div className="infoBox mt-3 lg:mt-5">
                <Title className="text-start text-[14px] sm:text-xl lg:text-2xl 2xl:text-3xl">
                  {data?.gallery_and_title?.title}
                </Title>
                <div className="flex w-full flex-row items-center justify-between gap-5 lg:my-3">
                  <PricingBox data={data} country={country} slug={slug} />
                </div>
              </div>

              {/* others info */}
              <div className="mt-5 flex flex-row items-center justify-between gap-7 overflow-hidden border border-theme-off-golden p-5 lg:mt-7">
                <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:justify-start lg:gap-7">
                  <div className="min-w-[150px]">
                    <p className="text-[15px] text-theme-light-golden lg:text-xl">
                      {data?.property_information?.property_name}
                    </p>

                    <span className="flow-row flex items-center justify-center gap-2 text-sm font-light text-white/80 md:justify-start">
                      <FiClock /> {data?.property_information?.address}
                    </span>
                  </div>

                  <div className="flex w-full max-w-full flex-row items-center justify-center gap-3 overflow-x-auto border-slate-400/50 px-3 md:justify-start md:border-l md:border-r lg:gap-7 lg:px-12">
                    <div className="box flex flex-row items-center justify-start gap-2">
                      <NextImage
                        src="/svg-icons/products/furniture-bed.svg"
                        alt="property"
                        width={20}
                        height={20}
                        className="h-8 w-6 object-cover lg:w-8"
                      />

                      <span className="text-[15px] md:text-lg lg:text-xl">
                        {data?.property_information?.bedrooms}
                      </span>
                    </div>

                    <div className="box flex flex-row items-center justify-start gap-2">
                      <NextImage
                        src="/svg-icons/products/furniture-bad.svg"
                        alt="property"
                        width={20}
                        height={20}
                        className="h-8 w-6 object-cover lg:w-8"
                      />

                      <span className="text-[15px] md:text-lg lg:text-xl">
                        {data?.property_information?.washrooms}
                      </span>
                    </div>

                    <div className="box flex flex-row items-center justify-start gap-2">
                      <NextImage
                        src="/svg-icons/products/furniture-size.svg"
                        alt="property"
                        width={20}
                        height={20}
                        className="h-7 w-5 object-cover lg:w-7"
                      />

                      <span className="text-lg lg:text-xl">
                        {data?.property_information?.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden min-w-[150px] justify-center lg:flex">
                  <NextImage
                    src={data?.property_information?.builder_logo}
                    alt="logo"
                    fill
                    className="max-w-[100px] overflow-hidden"
                  />
                </div>
              </div>
            </div>

            {/* side bar */}
            <div className="w-full lg:w-[22%]">
              <ExpertPropertyContactCard data={data} country={country} />

              <div className="row-span-2 mt-7">
                <VerticalAd
                  data={data?.ad_section}
                  containerClassName="h-full"
                  className="object-cover"
                  imageClassName="!object-cover"
                />
              </div>
            </div>
          </div>
        </Section.Container>
      </Section.HeroContainer>
    </Section>
  );
};

export default HeroSection;
