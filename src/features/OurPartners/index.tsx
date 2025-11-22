import { getOurPartners } from "@/api/get-our-partners";
import Section from "@/components/blocks/Section//index";
import Typography from "@/components/elements/texts/Typography";
import SingleSlider from "../SingleSlider/Slider";
import PartnerGroupList from "./PartnerGroupList";

interface IOurPartnersProps {
  className?: string;
  apiQuery?: {
    country?: string;
  };
}

const OurPartners = async ({ className, apiQuery }: IOurPartnersProps) => {
  const { desktop, mobile } = await getOurPartners(apiQuery);

  return (
    <Section.Container className={className}>
      <Typography
        as="h2"
        className="mb-2 text-center text-sm font-medium uppercase leading-[23px] text-theme-off-white sm:mb-3.5 sm:text-[32px] sm:leading-normal"
      >
        Our Partners
      </Typography>
      <Typography
        as="p"
        className="mb-3.5 text-center text-[9px] font-medium leading-[14px] text-theme-off-white sm:mb-[53px] sm:text-lg sm:leading-normal"
      >
        Trusted Collaborations with Leading Industry Partners
      </Typography>

      <div className="block md:hidden">
        <SingleSlider>
          <PartnerGroupList data={mobile} mode="mobile" />
        </SingleSlider>
      </div>

      <div className="hidden md:block">
        <SingleSlider>
          <PartnerGroupList data={desktop} mode="desktop" />
        </SingleSlider>
      </div>
    </Section.Container>
  );
};

export default OurPartners;
