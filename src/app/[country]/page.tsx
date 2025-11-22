import { getPageData } from "@/api/get-page-data";
import {
  getPropertyTypes,
  TGetPropertyTypesArgs,
} from "@/api/get-property-types";
import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import Typography from "@/components/elements/texts/Typography";
import CalculateYourAffordability from "@/features/CalculateYourAffordability";
import IndiaCalculator from "@/features/CalculateYourAffordability/IndiaCalculator/IndiaCalculator";
import OurDevelopers from "@/features/Carousal/our-developers/OurDevelopers";
import UpdatedExploreDubai from "@/features/Carousal/UpdatedExploreDubai/UpdatedExploreDubai";
import BuyRentSectionCountry from "@/features/CountryComponents/BuyRentSectionCountry";
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
import { getDistanceFromNow } from "@/library/utils/distance-from-now";
import { getParsedValue } from "@/library/utils/get-parsed-value";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";

interface IHomeProps {
  params: {
    country: string;
  };
  searchParams: { specialization?: string; propertyType?: string };
}

const countries = ["uae", "in", "ca"];
export default async function Home({ params, searchParams }: IHomeProps) {
  if (countries.indexOf(params?.country) === -1) {
    const page = await getPageData({
      slug: params?.country,
      country: "uae",
    });

    console.log("🚀 ~ page:", page);
    return (
      <>
        <Section className="flex min-h-[350px] items-end md:min-h-[60dvh] lg:py-0 xl:py-0 2xl:py-7">
          <Section.BackgroundImage
            src={page.image || "/images/default-banner.jpg"} // Fallback image if none provided
            className="h-full"
            priority
            quality={50}
            width={1440}
            height={302}
          />

          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#1A1A1A_0%,rgba(73,73,73,0.00)_66.5%)] opacity-70" />
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(0deg,rgba(20,18,19,0.99)_15%,rgba(73,73,73,0.00)_78.88%)]" />

          <Section.Container className="!h-full w-full items-end justify-end">
            <div className="flex h-full w-full flex-col justify-end">
              <Typography
                as="h1"
                className="text-3xl font-normal uppercase text-theme-light-golden md:text-[52px] md:leading-snug"
              >
                {page?.title}
              </Typography>
            </div>
          </Section.Container>
        </Section>
        <Section.Container className="mt-10">
          <div className="flex flex-col gap-40 md:flex-row">
            <div className="w-full md:flex-[60%]">
              <Typography className="mt-4 text-sm font-medium leading-[30px] text-theme-off-white md:mb-14 md:text-lg">
                {page?.subtitle}
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: page?.content || "",
                }}
              />
            </div>
          </div>
        </Section.Container>
      </>
    );
  }

  const parsedSpecialization = getParsedValue(searchParams?.specialization);

  const data = await getSeoMeta({
    url: `https://www.silveroakglobal.com/${params?.country}`,
  });

  const scripts = await JSON.parse(data[0]?.scripts || "[]");

  const propertyTypes = await getPropertyTypes({
    country: params?.country,
  });

  const propertyTypeList = propertyTypes.map((type) => ({
    label: type.name || "",
    value: type.id?.toString() ?? "",
  }));

  //   console.log("Param Country:", params?.country);

  if (params?.country === "ca") {
    return (
      <>
        <main className="overflow-hidden">
          {/* Hero Section */}
          <Section className="flex min-h-[40dvh] flex-col items-center justify-center lg:min-h-[80dvh]">
            <Section.HeroContainer>
              {/* desktop */}
              <div className="hidden md:block">
                <Section.BackgroundVideo src="https://listing-storage.s3.eu-north-1.amazonaws.com/storage/Website+Video+Black+%26+Gold+Reviews+Lap+3.mp4" />
              </div>
              {/* mobile */}
              <div className="md:hidden">
                <Section.BackgroundVideo src="https://listing-storage.s3.eu-north-1.amazonaws.com/storage/Website+Video+Black+%26+Gold+Reviews+Lap+3.mp4" />
              </div>
            </Section.HeroContainer>
          </Section>

          {/* Coming Soon Section */}
          <section className="my-12 text-center">
            <h2 className="text-2xl font-semibold md:text-4xl">Coming Soon!</h2>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="overflow-hidden">
        <Section className="flex min-h-[40dvh] flex-col items-center justify-center lg:min-h-[80dvh]">
          <Section.HeroContainer>
            {/* desktop */}
            <div className="hidden md:block">
              <Section.BackgroundVideo src="https://listing-storage.s3.eu-north-1.amazonaws.com/storage/Website+Video+Black+%26+Gold+Reviews+3+Image+with+Cloud.mp4" />
            </div>
            {/* mobile */}
            <div className="md:hidden">
              <Section.BackgroundVideo src="https://listing-storage.s3.eu-north-1.amazonaws.com/storage/Website+Video+Black+%26+Gold+Reviews+3+Image+with+Cloud.mp4" />
            </div>
          </Section.HeroContainer>
        </Section>
        <Section.Container>
          <br />
          <ProductsFilter2
            country={params?.country}
            propertyType={propertyTypeList}
          />
        </Section.Container>
        <>
          {params?.country !== "in" && (
            <SopExclusives
              className="mt-[30px] md:mt-[80px]"
              apiQuery={{
                country: params?.country,
              }}
            />
          )}
          <Properties
            apiQuery={{
              country: params?.country,
              property_type: searchParams?.propertyType,
            }}
            title="EXPLORE PROPERTY IN GURGAON"
            className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[113px]"
          />
        </>
        {params?.country !== "in" && <BuyRentSectionCountry />}
        {params.country === "in" && <IndiaCalculator />}
        {params.country !== "in" && (
          <CalculateYourAffordability className="mt-[30px] md:mt-[100px]" />
        )}
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[99px]"
        />
        <KeyFeatures
          apiQuery={{
            country: params?.country,
          }}
        />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[98px]"
        />
        {/* Real Estate Expert */}
        <ExpertHome apiQuery={{ country: params?.country }} />
        {params?.country !== "in" && (
          <Properties
            title="LUXURY PROPERTIES (SECONDARY)"
            // title="LUXURY PROPERTIES (RENTAL)"
            // title="LUXURY PROPERTIES (SECONDARY)"
            className="mt-[30px] md:mt-[113px]"
          />
        )}
        <PromptConsultationGrayBg />
        <ExpertsSection
          apiQuery={{
            country: params?.country,
            specialized: parsedSpecialization,
          }}
          className="mt-[30px] md:mt-[92px]"
        />
        {/* <Properties
      title="LUXURY PROPERTIES (SECONDARY)"
      className="mt-[113px]"
    /> */}
        {params?.country !== "in" && (
          <Properties
            // title="LUXURY PROPERTIES (SECONDARY)"
            title="LUXURY PROPERTIES (RENTAL)"
            className="mt-[30px] md:mt-[87px]"
          />
        )}
        <br />
        {/* <ExploreDubai apiQuery={{ country: params?.country }} /> */}
        <UpdatedExploreDubai
          country={params.country}
          apiQuery={{ country: params?.country }}
        />
        <br />
        <OrderedListFeatureSection
          country={params.country}
          className="mt-[30px] md:mt-[86px]"
        />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[77px] md:mt-[62px]"
        />
        {/* <MortgageCalculation /> */}
        {/* Mrotgage Calculation */}
        {/* <br /> */}
        {/* <MortgageExperts /> */}
        <Faq
          className="mt-20"
          apiQuery={{
            country: params?.country,
          }}
        />
        {params?.country !== "in" && (
          <ExpertRealStateInsight className="mt-[30px] md:mt-[84px]" />
        )}
        <Hr
          withSectionContainer
          className={`mb-[30px] mt-[30px] md:mb-[77px] md:mt-[62px] ${params?.country === "in" ? "!hidden" : ""}`}
        />
        {params?.country !== "in" && (
          <CountUp apiQuery={{ country: params?.country }} />
        )}
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[82px] md:mt-[63px]"
        />
        {/* <LifeStyle
          apiQuery={{ country: params?.country }}
          country={params.country}
          className="mb-[30px] mt-[30px] md:mb-[107px] md:mt-[113px]"
        />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[90px] md:mt-[110px]"
        /> */}
        <OurAchievements
          className="mb-[30px] mt-[30px] md:mb-[107px] md:mt-[113px]"
          apiQuery={{ country: params?.country }}
        />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[81px] md:mt-[136px]"
        />
        <OurPartners
          className="mb-[30px] mt-[30px] md:mb-[107px] md:mt-[113px]"
          apiQuery={{ country: params?.country }}
        />{" "}
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[69px] md:mt-[137px]"
        />
        <OurDevelopers
          apiQuery={{ country: params?.country }}
          country={params.country}
        />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[69px] md:mt-[137px]"
        />
        <Reviews
          className="mt-20"
          apiQuery={{
            country: params?.country,
          }}
        />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[69px] md:mt-[137px]"
        />
        {/* News */}
        <NewsSection
          apiQuery={{ country: params?.country }}
          country={params?.country}
        />
        {/* <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[69px] md:mt-[137px]"
        />
        <OfficeCarousel /> */}
      </main>
      {scripts.map((script: any, index: number) => (
        <script
          key={index}
          dangerouslySetInnerHTML={{ __html: script }} // Inject the JavaScript code
        />
      ))}
      {/* <HeroModalImage /> */}
    </>
  );
}
