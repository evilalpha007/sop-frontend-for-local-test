import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import Typography from "@/components/elements/texts/Typography";
import JobOpenings from "@/features/JobOpenings";
import OurAchievements from "@/features/OurAchievements";
import Reviews from "@/features/Reviews";
import WhyWorkWithSopVideos from "@/features/WhyWorkWithSopVideos";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import { Metadata } from "next";

export interface ICareersPageProps {
  title?: string;
  description?: string;
  feature_video?: string;
  video_gallery?: string[];
  feature_image?: string;
  button_text?: string;
  button_link?: string;
  job_title?: string;
  job_subtitle?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/careers",
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

const CareersPage = async () => {
  const res = await nextFetch<TResponse<ICareersPageProps | undefined>>(
    "v1/auth/careers/page-data",
  );
  const CareersData = res?.data || {};

  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/careers",
  });

  const scripts = await JSON.parse(data[0]?.scripts || "[]");

  return (
    <div>
      <Section>
        <Section.HeroContainer className="flex min-h-[302px] flex-col items-center justify-center">
          <Section.BackgroundImage
            src={`/images/banner/careers-hero-bg.webp`}
            className="h-full"
            priority
            quality={50}
            width={1440}
            height={302}
          />

          {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-transparent to-theme-black" /> */}
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(0deg,rgba(20,18,19,0.99)_10%,rgba(73,73,73,0.00)_78.88%)]" />

          <Section.Container className="bg-red-500# w-full px-5">
            <Typography
              as="h1"
              className="mb-10 text-center text-4xl font-medium text-theme-off-white md:text-[52px]"
            >
              Join Our Team
            </Typography>

            {/* <div className="flex flex-col items-center">
              <PrimaryButton className="py-2 text-sm font-normal text-theme-black sm:py-2">
                Properties on map
              </PrimaryButton>
            </div> */}
          </Section.Container>
        </Section.HeroContainer>
      </Section>

      <Section.Container>
        <WhyWorkWithSopVideos
          careersData={CareersData}
          className="mb-[95px] mt-5"
        />
        <JobOpenings />
        <Hr className="mb-[82px] mt-[87px] border-opacity-60" />
        <OurAchievements />
        <Hr className="mb-[96px] mt-[126px] border-opacity-60" />
        <Reviews />
      </Section.Container>
      {scripts.map((script: any, index: number) => (
        <script
          key={index}
          dangerouslySetInnerHTML={{ __html: script }} // Inject the JavaScript code
        />
      ))}
    </div>
  );
};

export default CareersPage;
