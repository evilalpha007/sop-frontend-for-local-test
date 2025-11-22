import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import OurAllTeamMemberCarousal from "@/features/Carousal/OurAllTeamMemberCarousal";
import ExpertProfileDetails from "@/features/ExpertProfileDetails";
import TeamExperts from "@/features/Experts/TeamExperts.tsx";
import OurAchievements from "@/features/OurAchievements";
import Reviews from "@/features/Reviews";
import { getParsedValue } from "@/library/utils/get-parsed-value";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";
import Image from "next/image";

interface IOurTeamPageProps {
  searchParams: {
    language?: string;
    country?: string;
    specialized?: string | number;
    limit?: number;
    page?: number;
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

const OurTeamPage = async ({ searchParams }: IOurTeamPageProps) => {
  // const specializationOptions = await getSpecializedOptions();
  // const languageOptions = await getLanguageOptions();
  // const { countries, defaultCountry } = await getCountries();

  return (
    <div>
      <Section>
        <Section.HeroContainer>
          <Section.Container>
            {/* <TeamMemberSlider /> */}
            <OurAllTeamMemberCarousal />
          </Section.Container>
        </Section.HeroContainer>
      </Section>

      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Image Section - 1/3 width on desktop */}
          <div className="md:w-1/3">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/sales-and-leasing-expert-details/devang-boss.jpg"
                alt="Devang Janani"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Section - 2/3 width on desktop */}
          <div className="md:w-2/3">
            <h1 className="mb-2 text-3xl" style={{ color: "#C7A57A" }}>
              DEVANG JANANI
            </h1>
            <h2 className="mb-6 text-lg text-gray-300">MANAGING DIRECTOR</h2>

            <div className="space-y-4 text-sm text-gray-300">
              <p className="text-gray-300">
                Silver Oak Properties, under the leadership of 
                Managing Director Devang Janani, is a premier
                real estate brokerage dedicated to providing personalized
                property solutions with a global reach. With offices in both
                Dubai and India, our firm is continually expanding, bringing our
                expertise to an international audience.
              </p>

              <p className="text-gray-300">
                Devang Janani, a visionary leader with a passion for excellence,
                has built a thriving agency focused on delivering
                customer-centric solutions. Guided by his belief in integrity
                and innovation, he fosters a culture where the needs of clients
                always come first. Under his leadership, the team is dedicated
                to continuous growth, collaboration, and providing lasting value
                to every client we serve.
              </p>

              <p className="text-gray-300">
                With extensive experience in the UAE and international markets,
                we offer tailored solutions for renting, buying, selling, and
                investing. Our clients&apos; satisfaction is the true measure of
                our success, built on a foundation of mutual trust and respect.
                Through open communication and ongoing collaboration, we
                actively welcome feedback and ideas. By implementing clear
                strategies, we continuously drive growth, productivity, and
                operational efficiency. Devang&apos;s dedication and vision
                drive our mission to deliver a seamless, rewarding experience
                for every client. What sets Silver Oak Properties apart is not
                just what we do, but how we do it.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Hr className="my-20" withSectionContainer />

      {/* expert List */}
      <TeamExperts
        disabled={false}
        apiQuery={{
          country: getParsedValue(searchParams?.country),
          specialized: getParsedValue(searchParams?.specialized),
          limit: getParsedValue(searchParams?.limit),
          language: getParsedValue(searchParams?.language),
          page: getParsedValue(searchParams?.page),
        }}
      />
      {/* <ExpertList className="mt-20">
        <ExpertList.Filters
          languageOptions={languageOptions}
          specializationOptions={specializationOptions}
          countries={countries}
        />

        <ExpertList.ExpertCardList
          className="mb-10 lg:grid-cols-4"
          apiQuery={{
            country: getParsedValue(searchParams?.country),
            specialized: getParsedValue(searchParams?.specialization),
            language: getParsedValue(searchParams?.language),
          }}
        />

        <ExpertList.Pagination
        // totalItems={totalItems}
        // itemsPerPage={itemsPerPage}
        // currentPage={currentPage}
        // onPageChange={handlePageChange}
        />
      </ExpertList> */}

      {/* <Hr className="my-20" withSectionContainer />

      <ExpertList className="mt-20">
        <ExpertList.Title title="SALES & LEASING TEAM MEMBERS (DUBAI)" />
        <ExpertList.Filters />
        <ExpertList.ExpertCardList className="mb-10 lg:grid-cols-4" />

        <ExpertList.Pagination
        // totalItems={totalItems}
        // itemsPerPage={itemsPerPage}
        // currentPage={currentPage}
        // onPageChange={handlePageChange}
        />
      </ExpertList> */}

      <Hr className="my-20" withSectionContainer />

      {/* <ExpertList className="mt-20">
        <ExpertList.Title
          className=""
          title="OPERATIONS & MARKETING TEAM MEMBERS"
        />
        <ExpertList.Filters />
        <ExpertList.ExpertCardList limit={16} className="mb-10 lg:grid-cols-4" />

        <ExpertList.Pagination
        // totalItems={totalItems}
        // itemsPerPage={itemsPerPage}
        // currentPage={currentPage}
        // onPageChange={handlePageChange}
        />
      </ExpertList> */}

      {/* <Hr className="my-20" withSectionContainer />

      <ExpertList className="mt-20">
        <ExpertList.Title title="SALES & LEASING TEAM MEMBERS (INDIA)" />
        <ExpertList.Filters />
        <ExpertList.ExpertCardList className="mb-10 lg:grid-cols-4" />

        <ExpertList.Pagination
        // totalItems={totalItems}
        // itemsPerPage={itemsPerPage}
        // currentPage={currentPage}
        // onPageChange={handlePageChange}
        />
      </ExpertList> */}

      {/* <Hr className="my-20" withSectionContainer /> */}

      <OurAchievements />

      <Hr className="my-20" withSectionContainer />

      <Reviews />
    </div>
  );
};

export default OurTeamPage;
