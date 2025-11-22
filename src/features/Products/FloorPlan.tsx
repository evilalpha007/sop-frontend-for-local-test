"use client";
import Section from "@/components/blocks/Section";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Key, useState } from "react";
import Slider from "react-slick";

// Custom Previous Arrow
const PrevArrow = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
    >
      <NextImage
        src="/svg-icons/slider/left-shift-arrow.svg"
        alt="prev-arrow"
        width={10}
        height={16}
        disableBlur
        className="h-[14px] w-[9px] shrink-0 cursor-pointer sm:h-8 sm:w-5"
      />
    </button>
  );
};

// Custom Next Arrow
const NextArrow = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
    >
      <NextImage
        src="/svg-icons/slider/left-shift-arrow.svg"
        alt="next-arrow"
        width={10}
        height={16}
        disableBlur
        className="h-[14px] w-[9px] shrink-0 rotate-180 cursor-pointer sm:h-8 sm:w-5"
      />
    </button>
  );
};

const FloorPlan = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState<"Floor Plan" | "Master Plan">(
    "Master Plan",
  );

  const filteredImages =
    data?.plan_section?.plan_data?.filter(
      (item: any) => item.plan_category == activeTab,
    ) || [];

  const sliderData = filteredImages.flatMap(
    (item: any, categoryIndex: number) =>
      item.images.map((imageSrc: string, imageIndex: number) => ({
        id: `${categoryIndex}-${imageIndex}`,
        src: imageSrc,
        title: `${activeTab === "Floor Plan" ? "Floor Plan" : "Master Plan"} ${categoryIndex + 1}-${imageIndex + 1}`,
      })),
  );

  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    customPaging: function (i: any) {
      return (
        <div className="flex h-[120px] w-full max-w-[150px] cursor-pointer flex-col items-center justify-center gap-1">
          <div
            className={`relative h-[80px] w-[120px] overflow-hidden border border-slate-200/40 ${
              activeSlide === i ? "border-theme-light-golden" : ""
            }`}
          >
            <Image
              width={120}
              height={80}
              src={sliderData[i]?.src}
              alt={`Thumbnail ${sliderData[i]?.title}`}
              className="h-full w-full object-contain"
            />
          </div>
          <span>
            <Typography className="text-[12px] font-light opacity-70 sm:text-sm">
              {sliderData[i]?.title}
            </Typography>
          </span>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: any, next: any) => setActiveSlide(next),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Section.Container>
      <div className="w-full pb-5">
        <div className="mb-8 flex w-full flex-row items-center justify-center">
          <button
            onClick={() => setActiveTab("Floor Plan")}
            className={`border px-7 py-1.5 text-center text-sm transition-all duration-300 lg:py-2 lg:text-[15px] ${
              activeTab === "Floor Plan"
                ? "border-theme-light-golden bg-theme-light-golden text-theme-black"
                : "border-slate-300/50 hover:border-theme-light-golden hover:bg-theme-light-golden hover:text-theme-black"
            }`}
          >
            Floor Plan
          </button>
          <button
            onClick={() => setActiveTab("Master Plan")}
            className={`border px-7 py-1.5 text-center text-sm transition-all duration-300 lg:py-2 lg:text-[15px] ${
              activeTab === "Master Plan"
                ? "border-theme-light-golden bg-theme-light-golden text-theme-black"
                : "border-slate-300/50 hover:border-theme-light-golden hover:bg-theme-light-golden hover:text-theme-black"
            }`}
          >
            Master Plan
          </button>
        </div>
        <div className="mb-8 flex w-full flex-col items-center justify-center">
          <Typography
            as="h2"
            className="mb-1.5 block text-center text-xl font-light text-theme-light-golden md:text-[32px] md:leading-[38px]"
          >
            {activeTab === "Floor Plan"
              ? "Explore the Floor Plan"
              : "View the Master Plan"}
          </Typography>
          <Typography
            as="p"
            className="mb-4 block text-center text-[10px] font-light text-theme-off-white text-opacity-80 md:mb-5 md:text-lg"
          >
            {activeTab === "Floor Plan"
              ? "A detailed look at the layout and space distribution"
              : "Comprehensive overview of the entire project layout"}
          </Typography>
        </div>
        <div className="slider-container relative">
          {sliderData.length > 0 ? (
            <div className="relative mx-auto max-w-[1200px]">
              <Slider {...settings}>
                {sliderData.map(
                  (item: {
                    id: Key | null | undefined;
                    src: string | StaticImport;
                    title: string;
                  }) => (
                    <div
                      key={item.id}
                      className="flex aspect-[16/10] w-full items-center justify-center px-8 pb-12 md:pb-24 lg:pb-28"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ),
                )}
              </Slider>
            </div>
          ) : (
            <Typography
              as="p"
              className="text-center text-theme-off-white text-opacity-80"
            >
              No images available for the selected plan type
            </Typography>
          )}
        </div>
      </div>
    </Section.Container>
  );
};

export default FloorPlan;
