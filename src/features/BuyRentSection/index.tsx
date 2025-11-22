"use client";
import Section from "@/components/blocks/Section/index";
import Button from "@/components/elements/buttons/Button";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { useState } from "react";
import FilterTab from "./FilterTab";
import Link from "next/link";

interface IBuyRentSectionProps {
  className?: string;
}

const tabData: Array<{
  id: string; // Ensure ID is always a string
  title: string;
  button: string;
  btnUrl: string;
  description?: string;
  topImageUrl: string;
  middleImageUrl: string;
  bottomImageUrl: string;
}> = [
  {
    id: "buy",
    title: "Buy",
    button: "Buy Now",
    btnUrl: "properties?is_front_section=1",
    description:
      "Our team of real estate agents UAE provides personalized guidance to navigate the best proper ties and investment opportunities.",
    topImageUrl: "/images/buy-rent-section/buy.webp",
    middleImageUrl: "/images/buy-rent-section/sell.webp",
    bottomImageUrl: "/images/buy-rent-section/rent.webp",
  },
  {
    id: "sell",
    title: "Sell",
    button: "Sell Now",
    btnUrl: "properties?is_front_section=2",
    description:
      "From listing to closing, we handle all aspects of the sale process while keeping your best interests in mind.",
    topImageUrl: "/images/buy-rent-section/sell.webp",
    middleImageUrl: "/images/buy-rent-section/rent.webp",
    bottomImageUrl: "/images/buy-rent-section/buy.webp",
  },
  {
    id: "rent",
    title: "Rent",
    button: "Rent Now",
    btnUrl: "properties?is_front_section=3",
    description:
      "Our team of top real estate agents Dubai streamline the rental process, ensuring you find the ideal space in prime locations across Dubai.",
    topImageUrl: "/images/buy-rent-section/rent.webp",
    middleImageUrl: "/images/buy-rent-section/buy.webp",
    bottomImageUrl: "/images/buy-rent-section/sell.webp",
  },
];

const BuyRentSection = ({ className }: IBuyRentSectionProps) => {
  const [activeTab, setActiveTab] = useState(tabData[0].id);

  const activeTabData = tabData.find((tab) => tab.id === activeTab);

  return (
    <Section.Container className={className}>
      <div>
        <div>
          <Typography
            as="h2"
            className="mb-2.5 text-center text-sm font-medium text-theme-off-white md:text-[32px]"
          >
            Looking to buy, sell, or rent?
          </Typography>
          <Typography
            as="h2"
            className="mx-auto mb-[19px] mt-5 w-full max-w-[627px] text-center text-[9px] font-normal leading-[25px] text-theme-off-white md:mb-8 md:text-lg"
          >
            Browse verified listings, property highlights, and market-ready
            options tailored to your location, budget, and goals.
          </Typography>
        </div>

        {/* Content Section */}
        <div className="flex flex-col-reverse items-center justify-between gap-x-[50px] gap-y-[23px] bg-theme-gray bg-opacity-20 px-[15px] pb-[30px] pt-[34px] md:pb-[34px] md:pl-[47px] md:pr-[42px] md:pt-[70px] lg:flex-row">
          {/* Left Content */}
          <div className="relative w-full">
            <div className="relative mb-3.5 w-full sm:mb-8 md:w-fit">
              {/* Filter Tabs */}
              <FilterTab
                data={tabData}
                activeTab={activeTab}
                onFilterClick={(tab) => setActiveTab(String(tab?.id))}
              />

              <div className="absolute -bottom-0 z-[1] w-full border-b border-b-theme-off-white border-opacity-70" />
            </div>

            {/* Text and Button */}
            <Typography className="mt-[23px] text-[11px] font-light text-theme-off-white md:mt-[25px] md:text-xl">
              {activeTabData?.description}
            </Typography>

            <Link href={activeTabData?.btnUrl ?? ""}>
              <Button className="transition-linear mt-5 w-full border border-theme-light-golden px-[54.5px] py-[7px] text-center text-xs font-normal text-white active:scale-x-95 md:mt-[42px] md:w-fit md:py-2.5 md:text-xl">
                {activeTabData?.button}
              </Button>
            </Link>
          </div>

          {/* Right Content */}
          <div className="px-5 pb-12 sm:pl-0 lg:-mt-7">
            <div className="relative w-fit">
              <NextImage
                src={activeTabData?.topImageUrl || ""}
                alt={activeTabData?.title ?? "image"}
                width={494}
                height={293}
                className="relative !z-[20] h-[155px] w-[264px] md:h-[285px] md:w-[486px]"
              />

              <NextImage
                src={activeTabData?.bottomImageUrl || ""}
                alt={activeTabData?.title ?? "image"}
                width={494}
                height={293}
                className="absolute left-[40px] top-[40px] !z-[0] h-[155px] w-[264px] md:h-[285px] md:w-[486px]"
              />

              <NextImage
                src={activeTabData?.middleImageUrl || ""}
                alt={activeTabData?.title ?? "image"}
                width={494}
                height={293}
                className="absolute left-[20px] top-[20px] !z-[0] h-[155px] w-[264px] md:h-[285px] md:w-[486px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Section.Container>
  );
};

export default BuyRentSection;
