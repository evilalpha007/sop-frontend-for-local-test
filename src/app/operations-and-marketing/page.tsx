import { getTeamExperts } from "@/api/get-team-experts";
import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import BreadCrumb from "@/features/BreadCrumb";
import ExpertProfileDetails from "@/features/ExpertProfileDetails";
import ExpertList from "@/features/Experts/ExpertList";
import HeroArea from "@/features/OperationAndMarketing/HeroArea";
import OurAchievements from "@/features/OurAchievements";
import Reviews from "@/features/Reviews";
import { getParsedValue } from "@/library/utils/get-parsed-value";

interface IOperationsAnsMarketingPageProps {
  searchParams: {
    specialized?: string;
    language?: string;
    country?: string;
  };
}

const OperationsAnsMarketingPage = async ({
  searchParams,
}: IOperationsAnsMarketingPageProps) => {
  const { data, paginationInfo } = await getTeamExperts({
    country: getParsedValue(searchParams?.country),
    specialized: getParsedValue(searchParams?.specialized),
    language: getParsedValue(searchParams?.language),
    limit: 8,
    page: 1,
  });
  return (
    <div>
      <HeroArea />
      <br />
      <Section.Container>
        <BreadCrumb
          data={[
            { title: "Home", link: "/" },
            { title: "Dubai", link: "/dubai" },
            {
              title: "Operations & Marketing",
              link: "/operations-and-marketing",
            },
          ]}
        />
      </Section.Container>
      <br />
      <div className="md:mt-auto">
        <ExpertProfileDetails.Title title="FIND YOUR EXISTENCE" />
        <ExpertProfileDetails.Filters />
        <ExpertProfileDetails>
          <ExpertProfileDetails.Description />
          <ExpertProfileDetails.ProfilePhoto />
        </ExpertProfileDetails>
      </div>

      <Section.Container>
        <Hr className="mb-[83px] mt-[88px]" />
      </Section.Container>

      <ExpertList>
        <ExpertList.Title title="FIND YOUR AGENT TO FIND A HOME" />
        {/* <ExpertList.Filters /> */}
        <ExpertList.ExpertCardList
          data={data}
          className="mb-8 lg:grid-cols-4"
        />
        <ExpertList.MoreButton>See All</ExpertList.MoreButton>
      </ExpertList>

      <Section.Container>
        <Hr className="mb-[83px] mt-[88px]" />
      </Section.Container>

      <OurAchievements />

      <Section.Container>
        <Hr className="mb-[83px] mt-[88px]" />
      </Section.Container>

      <Reviews />
    </div>
  );
};

export default OperationsAnsMarketingPage;
