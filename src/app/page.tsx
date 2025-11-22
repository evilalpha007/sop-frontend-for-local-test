import { Metadata } from "next";
import {
  getPropertyTypes,
  TGetPropertyTypesArgs,
} from "@/api/get-property-types";
import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import BuyRentSection from "@/features/BuyRentSection";
import CalculateYourAffordability from "@/features/CalculateYourAffordability";
import MortgageCalculation from "@/features/CalculateYourAffordability/MortgageCalculator/MortgageCalculation";
import OurDevelopers from "@/features/Carousal/our-developers/OurDevelopers";
import UpdatedExploreDubai from "@/features/Carousal/UpdatedExploreDubai/UpdatedExploreDubai";
import CountUp from "@/features/CountUp";
import ExpertRealStateInsight from "@/features/ExpertRealStateInsight";
import ExpertHome from "@/features/Experts/ExpertHome";
import ExpertsSection from "@/features/Experts/ExpertsSlide";
import Faq from "@/features/Faq";
import KeyFeatures from "@/features/KeyFeatures";
import LifeStyle from "@/features/LifeStyle";
import { NewsSection } from "@/features/NewsSection";
import OrderedListFeatureSection from "@/features/OrderedListFeatureSection";
import OurAchievements from "@/features/OurAchievements";
import OurPartners from "@/features/OurPartners";
import ProductsFilter2 from "@/features/ProductsFilter/ProductFilter2";
import PromptConsultationGrayBg from "@/features/PromptConsultationGrayBg";
import Properties from "@/features/Properties";
import Reviews from "@/features/Reviews";
import SopExclusives from "@/features/SopExclusives";
import { getParsedValue } from "@/library/utils/get-parsed-value";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import Head from "next/head";

interface IHomeProps {
  apiQuery: {
    property_type: string;
    bedrooms: number;
    max_price: number;
    is_front_section: number;
  };
  searchParams: {
    specialized?: string;
    language?: string;
    propertyType?: number;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com",
  });

  const seoData = data[0];

  return {
    title: seoData?.title,
    description: seoData?.description,
    keywords: seoData?.keywords,
    openGraph: {
      title: seoData?.title,
      description: seoData?.description,
      url: seoData?.route,
      type: "website",
    },
  };
}

export default async function Home({ searchParams }: any) {
  const propertyTypes = await getPropertyTypes();

  const propertyType = propertyTypes.map((type) => ({
    label: type.name || "",
    value: type.id?.toString() ?? "",
  }));

  return (
    <>
      <main className="overflow-hidden">
        <Section className="flex min-h-[40dvh]  flex-col items-center justify-center lg:min-h-[80dvh]">
          <Section.HeroContainer>
            <div className="hidden md:block">
              <Section.BackgroundVideo src="https://listing-storage.s3.eu-north-1.amazonaws.com/storage/Website+Video+Black+%26+Gold+Reviews+Lap+N.mp4" />
            </div>
            {/* mobile */}
            <div className="md:hidden">
              <Section.BackgroundVideo src="https://listing-storage.s3.eu-north-1.amazonaws.com/storage/Website+Video+Black+%26+Gold+Reviews+Lap+N.mp4" />
            </div>
          </Section.HeroContainer>
        </Section>

        <Section.Container>
          <br />
          <ProductsFilter2 propertyType={propertyType} />
        </Section.Container>

        <>
          <SopExclusives className="mt-[30px] md:mt-[80px]" />
          <Properties
            className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[113px]"
            apiQuery={{
              property_type: getParsedValue(searchParams?.propertyType),
              bedrooms: getParsedValue(searchParams?.bedrooms),
              min_price: getParsedValue(searchParams?.min_price),
              max_price: getParsedValue(searchParams?.max_price),
              is_front_section: 1,
            }}
          />
        </>
        <BuyRentSection className="mt-[30px] md:mt-[144px]" />
        <CalculateYourAffordability className="mt-[30px] md:mt-[100px]" />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[99px]"
        />
        <KeyFeatures />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[98px]"
        />
        <ExpertHome />
        <Properties
          title="LUXURY PROPERTIES (SECONDARY)"
          className="mt-[30px] md:mt-[113px]"
          apiQuery={{
            property_type: getParsedValue(searchParams?.propertyType),
            bedrooms: getParsedValue(searchParams?.bedrooms),
            is_front_section: 2,
          }}
        />
        <PromptConsultationGrayBg />
        <ExpertsSection className="mt-[30px] md:mt-[92px]" />
        <Properties
          title="LUXURY PROPERTIES (RENTAL)"
          className="mt-[30px] md:mt-[87px]"
          apiQuery={{
            property_type: getParsedValue(searchParams?.propertyType),
            bedrooms: getParsedValue(searchParams?.bedrooms),
            min_price: getParsedValue(searchParams?.min_price),
            max_price: getParsedValue(searchParams?.max_price),
            is_front_section: 3,
          }}
        />
        <br />
        <div className="md:mt-[87px]">
          <UpdatedExploreDubai />
        </div>
        <br />
        <OrderedListFeatureSection className="mt-[30px] md:mt-[86px]" />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[77px] md:mt-[62px]"
        />
        <MortgageCalculation />
        <Faq className="mt-20" />
        <ExpertRealStateInsight className="mt-[30px] md:mt-[84px]" />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[77px] md:mt-[62px]"
        />
        <CountUp />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[82px] md:mt-[63px]"
        />
        <OurAchievements className="mb-[30px] mt-[30px] md:mb-[107px] md:mt-[113px]" />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[81px] md:mt-[136px]"
        />
        <OurPartners className="mb-[30px] mt-[30px] md:mb-[107px] md:mt-[113px]" />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[69px] md:mt-[137px]"
        />
        <OurDevelopers />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[69px] md:mt-[137px]"
        />
        <Reviews className="mt-20" />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[69px] md:mt-[137px]"
        />
        <NewsSection />
      </main>
    </>
  );
}
