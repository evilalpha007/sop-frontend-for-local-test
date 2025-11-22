"use client";
import Section from "@/components/blocks/Section/index";
import Button from "@/components/elements/buttons/Button";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { useState } from "react";
import FilterTab from "./FilterTab";

interface IExpertRealStateInsightProps {
  className?: string;
}

const tabData: Array<{
  id: string; // Ensure ID is always a string
  title: string;
  button: string;
  btnUrl: string;
  description: string;
  topImageUrl: string;
  bottomImageUrl: string;
}> = [
  {
    id: "blog",
    title: "Blog",
    button: "EXPLORE BLOGS",
    btnUrl: "/blogs",
    description:
      "Explore what’s new in Dubai through our informative blog posts and video highlights, keeping you in the loop.",
    topImageUrl: "/images/expert-real-state-insight/blog.webp",
    bottomImageUrl: "/images/expert-real-state-insight/video.webp",
  },
  {
    id: "video",
    title: "Video",
    button: "EXPLORE VIDEOS",
    description:
      "Explore what’s new in Dubai through our informative blog posts and video highlights, keeping you in the loop.",
    btnUrl: "https://www.youtube.com/channel/UCumxu3ox9xTMZZCtTY6zI0w",
    topImageUrl: "/images/expert-real-state-insight/video.webp",
    bottomImageUrl: "/images/expert-real-state-insight/blog.webp",
  },
];

const ExpertRealStateInsight = ({
  className,
}: IExpertRealStateInsightProps) => {
  const [activeTab, setActiveTab] = useState(tabData?.[0]?.id); // Default to the first tab

  // Find the currently active tab data
  const activeTabData = tabData.find((tab) => tab.id === activeTab);

  return (
    <Section.Container className={className}>
      <div>
        {/* Header Text */}
        <div>
          <Typography
            as="h2"
            className="mb-2.5 text-center text-sm font-medium text-theme-off-white sm:mb-5 md:text-[32px]"
          >
            Dubai Property Market Facts & Insights
          </Typography>
          <Typography
            as="p"
            className="mx-auto mb-[19px] mt-5 w-full max-w-[627px] text-center text-[9px] font-normal leading-[25px] text-theme-off-white md:mb-8 md:text-lg"
          >
            Know about the latest trends and developments happening in Dubai
            through our informative blogs and videos.
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
                onFilterClick={(tab) => setActiveTab(String(tab.id))}
              />

              <div className="absolute -bottom-0 z-[1] w-full border-b border-b-theme-off-white border-opacity-70" />
            </div>

            {/* Text and Button */}
            <Typography className="mt-[23px] text-[11px] font-light text-theme-off-white md:mt-[25px] md:text-xl">
              {activeTabData?.description}
            </Typography>

            <Button
              className="transition-linear mt-5 w-full border border-theme-light-golden px-[54.5px] py-[7px] text-center text-xs font-normal text-white active:scale-x-95 md:mt-[42px] md:w-fit md:py-2.5 md:text-xl"
              onClick={() => window.open(activeTabData?.btnUrl, "_blank")}
            >
              {activeTabData?.button}
            </Button>
          </div>

          {/* Right Content */}
          <div className="pl-5 sm:pl-0">
            <div className="relative w-fit">
              {/* Top Image (Dynamic) */}
              <NextImage
                src={activeTabData?.topImageUrl || ""}
                alt={activeTab === "blog" ? "Blog Top" : "Video Top"}
                width={494}
                height={293}
                className="absolute bottom-[20px] right-[24px] !z-[10] h-[155px] w-[264px] md:bottom-[38px] md:right-[45px] md:h-[285px] md:w-[486px]"
              />

              {/* Bottom Image (Dynamic) */}
              <NextImage
                src={activeTabData?.bottomImageUrl || ""}
                alt={activeTab === "blog" ? "Blog Bottom" : "Video Bottom"}
                width={494}
                height={293}
                className="z-[0] h-[155px] w-[264px] md:h-[285px] md:w-[486px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Section.Container>
  );
};

export default ExpertRealStateInsight;
