import Container from "@/components/blocks/Section/Container";
import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import Typography from "@/components/elements/texts/Typography";
import CalculateYourAffordability from "@/features/CalculateYourAffordability";
import LargeBlogCard from "@/features/LargeBlogCard";
import { NewsSection } from "@/features/NewsSection";
import Header from "@/features/Properties/Header";
import PropertyList from "@/features/Properties/PropertyList";
import ROICapitalAppreciationByCountry from "@/features/ROICapitalAppreciationByCountry";
import SmallBlogCard from "@/features/SmallBlogCard";
import { TCountryParams } from "@/library/hooks/useCountryRouting";
import { getParsedValue } from "@/library/utils/get-parsed-value";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

interface INonResidentsCornerPageProps {
  params?: TCountryParams;
  searchParams?: {
    propertyType?: string | number;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/non-residents-corner",
  });

  const seoData = data[0];

  return {
    title:
      seoData?.title ||
      "Silver Oak Real Estate | Exclusive Homes & Investment Opportunities",
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

export default function NonResidentsCornerPage({
  params,
  searchParams,
}: INonResidentsCornerPageProps) {
  if (params?.country) {
    redirect(`/non-residents-corner`);
  }

  return (
    <>
      <main className="overflow-hidden">
        <Section className="flex min-h-[65dvh] flex-col items-center justify-center lg:min-h-[60dvh]">
          <Section.HeroContainer>
            <Section.BackgroundImage
              src="/images/banner/non-residents-page.webp"
              className="h-full"
              priority
              quality={50}
            />

            <div className="absolute inset-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-theme-black" />
            <div className="absolute bottom-0 left-0 right-0 h-[38%] w-full bg-[linear-gradient(0deg,#141213_0%,rgba(73,73,73,0.00)_52%)]" />

            <Section.Container className="relative z-10 w-full px-5">
              <Typography
                as="h1"
                className="text-4xl !leading-none md:text-[52px]"
              >
                Investing in the UAE as a Non-Resident?
              </Typography>

              <Typography
                as="h2"
                className="!mb-[21px] mt-5 text-xl font-normal text-[#D9D9D9] md:leading-none"
              >
                Check your eligibility and explore expert insights.
              </Typography>
            </Section.Container>
          </Section.HeroContainer>
        </Section>

        <CalculateYourAffordability className="mt-[30px] md:mt-[100px]" />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[99px]"
        />
        <Section.Container>
          {/* heading */}
          <Header
            title="LUXURY PROPERTIES IN DUBAI"
            propertyType={getParsedValue(searchParams?.propertyType)}
          />

          {/* Fixed apiQuery with required fields */}
          <PropertyList
            apiQuery={{
              category: (arg0: string, category: any) => category,
              type: (arg0: string, type: any) => type,
              city: (arg0: string, city: any) => city,
              search: (arg0: string, search: any) => search,
              is_front_section: 1,
            }}
          />


          <div className="mt-8 flex items-center justify-center">
            <OutlineButton asChild>
              <Link href={"/properties"}>EXPLORE MORE PROPERTIES IN DUBAI</Link>
            </OutlineButton>
          </div>
        </Section.Container>
        <br />

        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[99px]"
        />
        <ROICapitalAppreciationByCountry />
        <Hr
          withSectionContainer
          className="mb-[30px] mt-[30px] md:mb-[100px] md:mt-[99px]"
        />

        <NewsSection country="uae" type="non-residents-corner" />
      </main>
    </>
  );
}
