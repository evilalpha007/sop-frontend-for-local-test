import Section from "@/components/blocks/Section";
import Typography from "@/components/elements/texts/Typography";
import DeveloperCardList from "@/features/Experts/Developers/DeveloperCardList";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";

interface IOurDeveloperPageProps {
  params: {
    country: string;
  };
  searchParams: { specialization?: string };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/in/our-developers",
  });

  const seoData = data[0];

  return {
    title:
      seoData?.title ||
      "Silver Oak Real Estate India | Exclusive Homes & Investment Opportunities",
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

const OurDeveloperPage = async ({
  params,
  searchParams,
}: IOurDeveloperPageProps) => {
  return (
    <div>
      <Section>
        <Section.HeroContainer className="flex min-h-[150px] flex-col items-center justify-center">
          <Section.BackgroundImage
            src="/images/banner/our-services-hero.webp"
            className="h-full"
            priority
            quality={50}
            width={1440}
            height={302}
          />

          {/* <div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#141213_5.5%,rgba(73,73,73,0.00)_68%)]" /> */}
          <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-theme-black" />

          <Section.Container className="bg-red-500# w-full px-5">
            <Typography
              as="h1"
              className="text-center text-[1.5rem] font-light uppercase leading-normal text-theme-off-white md:text-[52px] md:!leading-none"
            >
              Our Developers
            </Typography>

            <Typography
              as="p"
              className="mt-5 text-center text-[15px] font-medium leading-4 text-theme-off-white text-opacity-80 md:text-lg md:leading-[26px]"
            >
              our developers are the best in the world
            </Typography>
          </Section.Container>
        </Section.HeroContainer>
      </Section>
      <Section.Container className="max-w-[1224px]">
        <DeveloperCardList
          country={params.country}
          apiQuery={{
            country: params.country,
          }}
        />
      </Section.Container>
    </div>
  );
};

export default OurDeveloperPage;
