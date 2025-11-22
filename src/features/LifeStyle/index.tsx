import { getLifeStyle } from "@/api/get-lifestyles";
import Section from "@/components/blocks/Section/index";
import SingleSlider from "../SingleSlider/Slider";
import Heading from "./Heading";
import LifeStyleImage from "./LifeStyleImage";

interface ILifeStyleProps {
  className?: string;
  apiQuery?: {
    country?: string;
  };
  country?: string;
}

// const data: ISlideGroupProps[] = [
//   {
//     id: crypto.randomUUID(),
//     one: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/uae/01.webp",
//       alt: "Business Bay",
//       title: "Business Bay",
//       link: "",
//     },
//     two: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/uae/02.webp",
//       alt: "Damac Islands",
//       title: "Damac Islands",
//       link: "",
//     },
//     three: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/uae/03.webp",
//       alt: "Dubai Marina",
//       title: "Dubai Marina",
//       link: "",
//     },
//     four: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/uae/04.webp",
//       alt: "Dubai South",
//       title: "Dubai South",
//       link: "",
//     },
//   },
//   {
//     id: crypto.randomUUID(),
//     one: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/uae/05.webp",
//       alt: "Expo City",
//       title: "Expo City",
//       link: "",
//     },
//     two: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/uae/06.webp",
//       alt: "MBR City",
//       title: "MBR City",
//       link: "",
//     },
//     three: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/uae/07.webp",
//       alt: "Palm Jumeirah",
//       title: "Palm Jumeirah",
//       link: "",
//     },
//     // duplicate 01
//     four: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/uae/01.webp",
//       alt: "The Lagoons",
//       title: "The Lagoons",
//       link: "",
//     },
//   },
// ];

// // india data
// const dataIndia: ISlideGroupProps[] = [
//   {
//     id: crypto.randomUUID(),
//     one: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/in/01.webp",
//       alt: "Golf Course Ext. Road",
//       title: "Golf Course Ext. Road",
//       link: "",
//     },
//     two: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/in/02.webp",
//       alt: "Golf Course Road",
//       title: "Golf Course Road",
//       link: "",
//     },
//     three: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/in/03.webp",
//       alt: "Dwarka Express Way",
//       title: "Dwarka Express Way",
//       link: "",
//     },
//     four: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/in/04.webp",
//       alt: "SPR Road",
//       title: "SPR Road",
//       link: "",
//     },
//   },
//   {
//     id: crypto.randomUUID(),
//     one: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/in/05.webp",
//       alt: "Sohan Road",
//       title: "Sohan Road",
//       link: "",
//     },
//     two: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/in/06.webp",
//       alt: "New Gurgaon",
//       title: "New Gurgaon",
//       link: "",
//     },
//     three: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/in/01.webp",
//       alt: "Golf Course Ext. Roa",
//       title: "Golf Course Ext. Roa",
//       link: "",
//     },
//     four: {
//       id: crypto.randomUUID(),
//       src: "/images/lifestyle/in/02.webp",
//       alt: "Golf Course Road",
//       title: "Golf Course Road",
//       link: "",
//     },
//   },
// ];

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

const LifeStyle = async ({ className, apiQuery, country }: ILifeStyleProps) => {
  const ourLifeStyleData = await getLifeStyle(apiQuery);
  return (
    <Section.Container className={className}>
      {country !== "in" ? (
        <Heading
          title={"Top Neighborhoods"}
          description={"Find the best areas to invest in UAE"}
          className="mb-[15px] sm:mb-[35px]"
        />
      ) : (
        <Heading
          title={"Live the extraordinary"}
          description={"Choose a lifestyle that defines you"}
          className="mb-[15px] sm:mb-[35px]"
        />
      )}

      <Section.Container>
        <SingleSlider settings={slideSettings}>
          {ourLifeStyleData?.map((item, idx) => (
            <LifeStyleImage
              key={item?.id || idx}
              imageUrl={item?.image}
              name={item?.name}
              slug={item?.slug}
            />
          ))}
        </SingleSlider>
      </Section.Container>
    </Section.Container>
  );
};

export default LifeStyle;
