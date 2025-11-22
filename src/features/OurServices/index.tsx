import Section from "@/components/blocks/Section/index";
import Typography from "@/components/elements/texts/Typography";
import Service, { IServiceProps } from "./Service";

const dataDubai: IServiceProps[] = [
  {
    title: " Property Solutions",
    image: "/images/who-we-are/our-services/property-solutions.webp",
    description: [
      " Discover premium properties in Dubai.",
      " Secure competitive mortgage options with expert guidance.",
    ],
  },
  {
    title: "GLOBAL INVESTMENT",
    image: "/images/who-we-are/our-services/global-investment.webp",
    description: [
      "Simplify cross-border structuring and UAE residency.",
      " Tailored programs to match your needs.",
    ],
    flip: true,
  },
  {
    title: "BUSINESS SETUP ASSISTANCE",
    image: "/images/who-we-are/our-services/business-setup.webp",
    description: [
      " Establish Mainland or Free Zone businesses effortlessly. ",
      " Optimize investments with strategic NRI tax and wealth planning.",
    ],
  },
  {
    title: "LAND & LEGAL",
    image: "/images/who-we-are/our-services/land-and-legal.webp",
    description: [
      " Full support for land acquisition and development.",
      " Ensure legal compliance and estate planning assistance.",
    ],
    flip: true,
  },
  {
    title: "INVESTOR ASSISTANCE ",
    image: "/images/who-we-are/our-services/investment-assistance.webp",
    description: [
      "Strategic guidance for real estate decisions.",
      "Streamlined, stress-free processes.",
    ],
  },
];
const dataIndia: IServiceProps[] = [
  {
    title: "Consulting",
    image: "/images/who-we-are/our-services/in/consulting.png",
    description: [
      "Expert advice on real estate investment opportunities in Gurugram.",
      "Personalized guidance for buying or selling based on your budget and needs.",
    ],
  },
  {
    title: "Buying",
    image: "/images/who-we-are/our-services/in/Buying.png",
    description: [
      "Exclusive listings of residential and commercial properties in Gurugram.",
      "Expert guidance to match location, budget, and amenities.",
    ],
    flip: true,
  },
  {
    title: "Selling",
    image: "/images/who-we-are/our-services/in/selling.png",
    description: [
      "Market your property via a vast network and digital platforms.",
      "Hassle-free management of viewings and paperwork.",
    ],
  },
  {
    title: "Renting",
    image: "/images/who-we-are/our-services/in/Renting.png",
    description: [
      "Short and long-term rental options for all needs.",
      "Transparent lease agreements for tenants and landlords.",
    ],
    flip: true,
  },
  {
    title: "Purchase Support",
    image: "/images/who-we-are/our-services/in/Purchase support.png",
    description: [
      "Help with paperwork, legal documentation, and securing financing options.",
      "Guidance through government regulations, approvals, and processes.",
    ],
  },
];

interface IOurServiceProps {
  country?: string;
}

const OurServices = ({ country = "uae" }: IOurServiceProps) => {
  return (
    <Section.Container>
      <Typography
        as="h2"
        className="mb-10 text-center text-xl font-medium leading-[47px] text-theme-off-white md:text-3xl"
      >
        Our Services
      </Typography>

      <div className="space-y-[100px]">
        {country === "in" ? (
          <>
            {dataIndia?.map((service, index) => (
              <Service key={index} {...service} />
            ))}
          </>
        ) : (
          <>
            {dataDubai?.map((service, index) => (
              <Service key={index} {...service} />
            ))}
          </>
        )}
      </div>
    </Section.Container>
  );
};

export default OurServices;
