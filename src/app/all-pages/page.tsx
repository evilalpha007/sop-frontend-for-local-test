import { getCountries } from "@/api/get-countries";
import Section from "@/components/blocks/Section";
import Typography from "@/components/elements/texts/Typography";
import BlogList from "@/features/BlogList";
import HorizontalAd from "@/features/HorizontalAd";
import { TCountry } from "@/features/Navbar";
import { NewsSection } from "@/features/NewsSection";
import FeaturedSingleBlog from "@/features/NewsSection/FeaturedSingleBlog";
import PageList from "@/features/PageList/page";
import VerticalAd from "@/features/VerticalAd";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";
import { headers } from "next/headers";

interface IBlogPageProps {
  params: {
    country: string;
  };
  searchParams: { specialization?: string };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/all-pages",
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

const BlogPage = async ({ params }: IBlogPageProps) => {
  return (
    <div>
      <Section>
        <Section.HeroContainer className="flex min-h-[150px] flex-col items-center justify-center">
          <Section.BackgroundImage
            src="/images/banner/blog-hero.webp"
            className="h-full"
            priority
            quality={50}
            width={1440}
            height={302}
          />

          {/* <div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#141213_5.5%,rgba(73,73,73,0.00)_68%)]" /> */}
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(0deg,#1A1A1A_0%,rgba(73,73,73,0.00)_78.5%)]" />

          <Section.Container className="bg-red-500# w-full px-5">
            <Typography
              as="h1"
              className="text-center text-4xl font-light uppercase text-theme-off-white md:text-[52px]"
            >
              All Pages
            </Typography>
            <Typography
              as="p"
              className="mt-5 text-center text-[15px] font-medium leading-4 text-theme-off-white text-opacity-80 md:text-lg md:leading-[26px]"
            >
              Explore our latest news, updates, and insights from the real
              estate world. Stay informed and inspired with our curated content.
            </Typography>
          </Section.Container>
        </Section.HeroContainer>
      </Section>

      <div className="mt-7 space-y-1 md:space-y-20 lg:mt-20">
        <Section.Container>
          <PageList country={"uae"} />
        </Section.Container>
      </div>
    </div>
  );
};

export default BlogPage;
