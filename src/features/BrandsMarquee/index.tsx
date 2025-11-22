import Section from "@/components/blocks/Section/index";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import Marquee from "react-fast-marquee";
import BrandList from "./BrandList";
import { cn } from "@/library/utils/cn";

interface IBrandsMarqueeProps {
  className?: string;
}

const BrandsMarquee = ({ className }: IBrandsMarqueeProps) => {
  return (
    <Section.Container
      className={cn("sm:px-2/ mx-0 px-0 sm:mx-auto", className)}
    >
      <div className="border border-solid border-theme-green-gray border-opacity-20 bg-theme-gray bg-opacity-20">
        <Typography
          as="h2"
          className="mb-2.5 mt-[11px] text-center text-[10px] font-medium text-theme-light-golden sm:mb-7 sm:mt-[30px] sm:text-[32px]"
        >
          We make the banks work for you
        </Typography>

        <div className="mb-4 cursor-pointer px-4 sm:mb-[45px] sm:px-10">
          <Marquee pauseOnHover className="gap-4">
            <BrandList />
          </Marquee>
        </div>
      </div>
    </Section.Container>
  );
};

export default BrandsMarquee;
