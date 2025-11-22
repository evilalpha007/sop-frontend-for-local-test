import { getOurDevelopers } from "@/api/get-our-developers";
import Section from "@/components/blocks/Section";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import Slider from "./Slider";

export interface TDeveloperItemSlides {
  id: number;
  image: string;
  name: string;
  slug: string;
}

interface IOurDevelopersProps {
  country?: string;
  apiQuery?: {
    country?: string;
  };
}

const OurDevelopers = async ({
  country = "",
  apiQuery,
}: IOurDevelopersProps) => {
  const developersData = await getOurDevelopers(apiQuery);

  return (
    <Section.Container>
      <div className="my-7 flex w-full flex-col items-center justify-center gap-0 md:flex-row md:gap-12">
        {/* Info Section */}
        <div className="order-2 w-full p-3 text-start md:order-1 md:w-2/6">
          <Typography className="text-2xl text-theme-light-golden lg:text-3xl">
            {country !== "in"
              ? "Top developers in UAE"
              : "Top Developers in Gurugram"}
          </Typography>
          <p className="mt-3 text-sm font-light opacity-90 md:text-[15px]">
            {country !== "in"
              ? "Partnering with leading developers of UAE who redefine real estate standards by combining innovation, design, excellence and quality."
              : "Partnering with leading developers of Gurugram who redefine real estate standards by combining innovation, design, excellence and quality."}
          </p>

          <div className="mt-7 w-full md:mt-10">
            <Link
              className="flex w-full flex-col items-center justify-center border border-transparent bg-theme-light-golden p-2 px-10 text-center text-sm text-black md:w-fit md:border-slate-400/50 md:bg-transparent md:p-3.5 md:px-12 md:text-lg md:text-theme-light-golden"
              href={`${country === "" ? "/our-developers" : `/${country}/our-developers`}`}
            >
              CLICK NOW
            </Link>
          </div>
        </div>

        {/* Slider Section */}
        
        <Slider country={country} slidesData={developersData} />
      </div>
    </Section.Container>
  );
};

export default OurDevelopers;
