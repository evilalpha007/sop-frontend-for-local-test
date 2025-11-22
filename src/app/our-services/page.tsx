import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import Typography from "@/components/elements/texts/Typography";
import OurServices from "@/features/OurServices";
import WhoWeAre from "@/features/WhoWeAre";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/our-services",
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
const WhoWeArePage = async () => {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/our-services",
  });

  const scripts = await JSON.parse(data[0]?.scripts || "[]");
  return (
    <>
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
              Your trusted partner in {`UAE's`} real estate market
            </Typography>

            <Typography
              as="p"
              className="mt-5 text-center text-[15px] font-medium leading-4 text-theme-off-white text-opacity-80 md:text-lg md:leading-[26px]"
            >
              Turnkey real estate services
            </Typography>
          </Section.Container>
        </Section.HeroContainer>
      </Section>

      <Section className="overflow-x-hidden">
        <Section.Container>
          <WhoWeAre />
          <Hr className="mb-[76.5px] mt-[71px]" />
          <OurServices />
        </Section.Container>
      </Section>

      {scripts.map((script: any, index: number) => (
        <script
          key={index}
          dangerouslySetInnerHTML={{ __html: script }} // Inject the JavaScript code
        />
      ))}
    </>
  );
};

export default WhoWeArePage;
