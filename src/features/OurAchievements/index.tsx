import { getAchievements } from "@/api/get-achievements";
import Section from "@/components/blocks/Section/index";
import SingleSlider from "../SingleSlider/Slider";
import AchievementImage from "./AchievementImage";
import Heading from "./Heading";

interface IOurAchievementsProps {
  className?: string;
  apiQuery?: {
    country?: string;
  };
}

const slideSettings = {
  slidesToShow: 4,
  slidesToScroll: 4,
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

// const data: ISlideGroupProps[] = [
//   {
//     id: crypto.randomUUID(),
//     one: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/1.svg",
//       alt: "our-achievement-1",
//     },
//     two: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/2.svg",
//       alt: "our-achievement-2",
//     },
//     three: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/3.svg",
//       alt: "our-achievement-3",
//     },
//     four: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/4.svg",
//       alt: "our-achievement-4",
//     },
//   },
//   {
//     id: crypto.randomUUID(),
//     one: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/2.svg",
//       alt: "our-achievement-2",
//     },
//     two: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/3.svg",
//       alt: "our-achievement-3",
//     },
//     three: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/4.svg",
//       alt: "our-achievement-4",
//     },
//     four: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/1.svg",
//       alt: "our-achievement-1",
//     },
//   },
//   {
//     id: crypto.randomUUID(),
//     one: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/3.svg",
//       alt: "our-achievement-3",
//     },
//     two: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/4.svg",
//       alt: "our-achievement-4",
//     },
//     three: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/1.svg",
//       alt: "our-achievement-1",
//     },
//     four: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/2.svg",
//       alt: "our-achievement-2",
//     },
//   },
//   {
//     id: crypto.randomUUID(),
//     one: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/4.svg",
//       alt: "our-achievement-4",
//     },
//     two: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/1.svg",
//       alt: "our-achievement-1",
//     },
//     three: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/2.svg",
//       alt: "our-achievement-2",
//     },
//     four: {
//       id: crypto.randomUUID(),
//       src: "/images/our-achievements/3.svg",
//       alt: "our-achievement-3",
//     },
//   },
// ];

export interface ISlideImage {
  id: number;
  alt_text?: string;
  image: string;
}

const OurAchievements = async ({
  className,
  apiQuery,
}: IOurAchievementsProps) => {
  const ourAchievementsData = await getAchievements(apiQuery);

  return (
    <Section.Container className={className}>
      <Heading
        title={"Our Achievements"}
        description={"Recognized for excellence & unmatched service"}
        className="mb-[15px] sm:mb-[35px]"
      />

      <Section.Container>
        <SingleSlider settings={slideSettings}>
          {ourAchievementsData?.map((item, idx) => (
            <AchievementImage
              key={item?.id || idx}
              imageUrl={item?.image}
              alt={item?.alt_text}
            />
          ))}
        </SingleSlider>
      </Section.Container>
    </Section.Container>
  );
};

export default OurAchievements;
