import { getHomeGuides } from "@/api/get-home-guide"; // Import the API function
import Section from "@/components/blocks/Section";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import Slider from "./Slider";
import SliderIndia from "./SliderIndia";

interface IExploreDubaiProps {
  apiQuery?: { country?: string };
  country?: string;
}

const UpdatedExploreDubai = async ({
  apiQuery,
  country = "uae",
}: IExploreDubaiProps) => {
  const guideData = await getHomeGuides(apiQuery);

  // console.log("apiQuery", apiQuery);

  return (
    <Section.Container>
      <div className="my-7 flex w-full flex-col items-center justify-center gap-0 md:flex-row md:gap-12">
        {/* Info Section */}
        <div className="order-2 w-full p-3 text-start md:order-1 md:w-2/6">
          <Typography className="text-2xl text-theme-light-golden lg:text-3xl">
            Exclusives Areas
          </Typography>

          <p className="mt-3 text-sm font-light opacity-90 md:text-[15px]">
            Looking for the perfect area to call home? <br /> Explore
            neighborhoods that offer the perfect balance of serene views and
            convenience.
          </p>

          <div className="mt-7 w-full md:mt-10">
            <Link
              className="flex w-full flex-col items-center justify-center border border-transparent bg-theme-light-golden p-2 px-10 text-center text-sm text-black md:w-fit md:border-slate-400/50 md:bg-transparent md:p-3.5 md:px-12 md:text-lg md:text-theme-light-golden"
              href={`/${country}/exclusive-areas`}
            >
              CLICK NOW
            </Link>
          </div>
        </div>

        {
          country ==="in" ? (
            <SliderIndia slidesData={guideData} />
          ): (
            <Slider slidesData={guideData} />
          )
        }
      </div>
    </Section.Container>
  );
};

export default UpdatedExploreDubai;
