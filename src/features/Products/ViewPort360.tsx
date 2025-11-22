"use client";
import Section from "@/components/blocks/Section";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";

// Custom Previous Arrow
const PrevArrow = ({ onClick }: any) => {
  return (
    <button onClick={onClick} className="absolute left-0 top-[40%] z-10">
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
    <button onClick={onClick} className="absolute right-0 top-[40%] z-10">
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

interface ViewPort360Props {
  data: {
    plan_section?: {
      plan_data?: {
        images?: string[];
      }[];
    };
  };
}

const ViewPort360 = ({ data }: ViewPort360Props) => {
  const images = data?.plan_section?.plan_data?.[0]?.images || [];

  const sliderData = images.map((image, index) => ({
    id: index + 1,
    src: image,
    title: `Image ${index + 1}`,
  }));

  // Track active index
  const [activeSlide, setActiveSlide] = useState(0);

  // Slider settings, including custom buttons and navigation
  const settings = {
    customPaging: function (i: any) {
      return (
        <div 
          className={`flex aspect-video h-full w-full max-w-[150px] cursor-pointer flex-col items-center justify-center gap-1`}
        >
          {/* Custom thumbnail navigation with active state */}
          <div
            className={`border border-slate-200/40 object-cover p-3 ${
              activeSlide === i ? "border-theme-light-golden" : ""
            }`}
          >
            <Image
              width={120}
              height={120}
              src={sliderData[i].src}
              alt={`Thumbnail ${sliderData[i].title}`}
              className="h-full w-full object-cover"
            />
          </div>
          <span>
            <Typography className="text-[12px] font-light opacity-70 sm:text-sm">
              {sliderData[i].title}
            </Typography>
          </span>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb", // Custom dot class for thumbnails
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: any, next: any) => setActiveSlide(next), // Update activeSlide on change
    prevArrow: <PrevArrow />, // Custom Previous button
    nextArrow: <NextArrow />, // Custom Next button
  };

  return (
    <Section.Container>
      <div className="w-full">
        <div className="mb-16 flex w-full flex-col items-center justify-center">
          <Typography
            as="h2"
            className="mb-1.5 block text-center text-xl font-light text-theme-light-golden md:text-[32px] md:leading-[38px]"
          >
            360° Viewport
          </Typography>
          <Typography
            as="p"
            className="mb-4 block text-center text-[10px] font-light text-theme-off-white text-opacity-80 md:mb-5 md:text-lg"
          >
            Immersive 360° Viewport for a Detailed Property Tour
          </Typography>
        </div>
        <div className="slider-container relative">
          <Slider {...settings}>
            {/* Dynamically render slider items */}
            {sliderData.map((item) => (
              <div
                key={item.id}
                className="flex w-full flex-col items-center justify-center pb-12 md:pb-24 lg:pb-28"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={600}
                  height={500}
                  className="mx-auto w-full max-w-[600px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Section.Container>
  );
};

export default ViewPort360;
