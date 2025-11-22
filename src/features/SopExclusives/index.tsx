import { getSopExclusives } from "@/api/get-sop-exclusives";
import Section from "@/components/blocks/Section/index";
import Typography from "@/components/elements/texts/Typography";
import SingleSlider from "../SingleSlider/Slider";
import Card from "./Card";

interface ISopExclusivesProps {
  className?: string;
  apiQuery?: {
    country?: string;
  };
}

const SopExclusives = async ({ className, apiQuery }: ISopExclusivesProps) => {
  const sopExclusiveData = await getSopExclusives(apiQuery);

  return (
    <Section.Container className={className}>
      <div className="hidden md:block">
        <Typography
          as="h2"
          className="mb-3 text-center text-[32px] font-medium text-theme-light-golden"
        >
          NEWLY LAUNCHED
        </Typography>

        <Typography
          as="h3"
          className="mb-[51px] text-center text-lg font-light text-theme-off-white"
        >
          Navigate properties in Dubai with us & explore investment
          opportunities now!
        </Typography>
      </div>

      {/* <div className="block md:hidden">
        {sopExclusiveData?.map((item) => <Card key={item.id} item={item} />)}
      </div> */}

      <div className="">
        <SingleSlider>
          {sopExclusiveData?.map((item) => <Card key={item.id} item={item} />)}
        </SingleSlider>
      </div>
    </Section.Container>
  );
};

export default SopExclusives;
