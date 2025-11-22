import { getSpecialty } from "@/api/get-speciality";
import Section from "@/components/blocks/Section/index";
import SingleSlider from "../SingleSlider/Slider";
import KeyFeatureCard from "./KeyFeatureCard";
import KeyFeaturesList from "./KeyFeaturesList";

interface IKeyFeaturesProps {
  className?: string;
  apiQuery?: { country?: string };
}

const slideSettings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

const KeyFeatures = async ({ className, apiQuery }: IKeyFeaturesProps) => {
  const keyFeaturesData = await getSpecialty(apiQuery);

  // console.log("features apiQuery", apiQuery);

  return (
    <Section.Container className={className}>
      <div className="block md:hidden">
        <Section.Container>
          <SingleSlider settings={slideSettings}>
            {/* <KeyFeaturesList withFragmentOnly /> */}
            {keyFeaturesData?.map((item, idx) => (
              <div className="px-2.5" key={item?.id || idx}>
                <KeyFeatureCard {...item} />
              </div>
            ))}
          </SingleSlider>
        </Section.Container>
      </div>

      <div className="hidden md:block">
        <KeyFeaturesList data={keyFeaturesData} />
      </div>
    </Section.Container>
  );
};

export default KeyFeatures;
