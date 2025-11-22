import { getSingleMember, TSingleMemberData } from "@/api/get-single-member";
import { getTeamExperts } from "@/api/get-team-experts";
import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import ExpertProfileDetails from "@/features/ExpertProfileDetails";
import ExpertList from "@/features/Experts/ExpertList";
import OurAchievements from "@/features/OurAchievements";
import Reviews from "@/features/Reviews";
import { getParsedValue } from "@/library/utils/get-parsed-value";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";
import Image from "next/image";

interface ISalesAndLeasingExpertsDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/our-team",
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

const SalesAndLeasingExpertsDetailsPage = async ({
  params,
}: ISalesAndLeasingExpertsDetailsPageProps) => {
  const data: any = await getSingleMember(params.slug);
  return (
    <div className="mt-10">
      <ExpertProfileDetails>
        <div className="basis-2/3">
          <ExpertProfileDetails.Description
            name={data?.full_name}
            designation={data?.position}
            description={data?.description}
            experience={data?.experience}
            languages={data?.languages}
            specialized={data?.specialized}
          />
        </div>
        <div className="basis-1/3">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={data?.image}
              alt={data?.full_name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </ExpertProfileDetails>

      <Section.Container>
        <Hr className="mb-[83px] mt-[128px]" />
      </Section.Container>

      <OurAchievements />

      <Section.Container>
        <Hr className="mb-[94px] mt-[128px]" />
      </Section.Container>

      <Reviews />

      <Section.Container>
        <Hr className="mb-[94px] mt-[128px]" />
      </Section.Container>
    </div>
  );
};

export default SalesAndLeasingExpertsDetailsPage;
