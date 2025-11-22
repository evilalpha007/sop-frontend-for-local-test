import Section from "@/components/blocks/Section/index";
import Typography from "@/components/elements/texts/Typography";
import FeatureCard, { IFeatureCardProps } from "./FeatureCard";

const data: IFeatureCardProps[] = [
  {
    title: "Mission",
    description:
      "To build lasting relationships by providing expert real estate solutions, investments, and consulting, delivering exceptional value and support at every stage.",
    image: {
      src: "/images/who-we-are/our-services/01.webp",
      alt: "SOP Management",
      imageWidth: 90,
      imageHeight: 99,
      imageClassName: "h-[98px] w-[90px]",
    },
  },
  {
    title: "Vision",
    description:
      "To create a customer-centric experience with tailored solutions, expanding our service to meet unique client needs and adding value with every interaction. ",
    image: {
      src: "/images/who-we-are/our-services/02.webp",
      alt: "SOP Design",
      imageWidth: 117,
      imageHeight: 97,
      imageClassName: "h-[97px] w-[117px]",
    },
  },
  {
    title: "Values",
    description:
      " Driven by integrity, innovation, and excellence, we prioritize customer satisfaction, adaptability, collaboration, and sustainability to create lasting value for all.",
    image: {
      src: "/images/who-we-are/our-services/03.webp",
      alt: "SOP Corporate",
      imageWidth: 107,
      imageHeight: 96,
      imageClassName: "h-[96px] w-[107px]",
    },
  },
];

const WhoWeAre = () => {
  return (
    <Section.Container className="overflow-x-hidden">
      {/* <Typography
        as="h2"
        className="text-center text-xl font-normal leading-[52px] text-theme-off-white md:text-[52px]"
      >
        Your Trusted Partner in {`UAE's`} Real Estate Market
      </Typography> */}

      {/* <Typography
        as="p"
        className="mt-4 text-center text-[12px] font-light text-theme-off-white text-opacity-60 md:text-[22px]"
      >
        Get to Know Our Team
      </Typography> */}

      {/* <Hr className="mb-[59px] mt-[54px] opacity-60" /> */}

      <Typography
        as="p"
        className="text-center text-xl font-normal text-theme-off-white md:text-[32px] md:leading-[47px]"
      >
        Seamless Real Estate Solutions Globally
      </Typography>

      <Typography
        as="p"
        className="md:leading-[44px]# mb-[34px] mt-3 text-center text-[12px] font-light text-theme-off-white md:text-[21px] md:leading-snug"
      >
        {/* Navigating the dynamic world of real estate can be complex, but at
        Silver Oak Properties, we make it seamless on a global scale. As a
        thriving agency, Silver Oak Properties blends the bold vision of a new
        company with deep-rooted expertise in the real estate market. With
        offices in both Dubai and India, our dedicated team of real estate
        professionals is here to guide you every step of the way, offering
        comprehensive investment and management services tailored to meet your
        unique needs across international markets. */}
        Navigating the dynamic world of real estate can be complex, but at
        Silver Oak Properties, we make it seamless on a global scale. As a
        thriving agency, Silver Oak Properties blends the bold vision of a new
        company with deep-rooted expertise in the real estate market. With
        offices in both Dubai and India, our dedicated team of real estate
        professionals is here to guide you every step of the way, offering
        comprehensive investment and management services tailored to meet your
        unique needs across international markets.
      </Typography>

      <div className="mb-[30px] grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((item, index) => <FeatureCard key={index} {...item} />)}
      </div>

      <Typography className="md:leading-8# mx-auto w-full max-w-[901px] text-center text-[12px] font-light text-theme-off-white md:text-[21px] md:leading-snug">
        {/* At SOP, trust and results are the foundation of our approach. With a
        sharp eye for detail and a commitment to excellence, we ensure your real
        estate journey is smooth, transparent, and rewarding. */}
        At SOP, trust and results are the foundation of our approach. With a
        sharp eye for detail and a commitment to excellence, we ensure your real
        estate journey is smooth, transparent, and rewarding.
      </Typography>
    </Section.Container>
  );
};

export default WhoWeAre;
