"use client";
import NextImage from "@/components/elements/images/NextImage";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";

// Custom Previous Arrow
const PrevArrow = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-[40%] z-10 md:-left-5"
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
      className="absolute right-0 top-[40%] z-10 md:-right-5"
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

const DubaiMarinaSlider = ({
  images,
}: {
  images: {
    id: number;
    property_id: number;
    image: string;
  }[];
}) => {
  // Track active index
  const [activeSlide, setActiveSlide] = useState(0);

  // Slider settings, including custom buttons and navigation
  const settings = {
    customPaging: function (i: any) {
      return (
        <div
          className={`flex aspect-video h-full w-full max-w-[80px] cursor-pointer flex-col items-center justify-center gap-1`}
        >
          {/* Custom thumbnail navigation with active state */}
          <div
            className={`border border-slate-200/40 object-cover ${
              activeSlide === i ? "border-theme-light-golden" : ""
            }`}
          >
            <Image
              width={120}
              height={120}
              src={images?.[i]?.image}
              alt={`Thumbnail ${images?.[i]?.image}`}
              className="h-full w-full object-cover"
            />
          </div>
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
    <>
      <div className="dubaiMarinaSlider w-full">
        <div className="slider-container relative">
          <Slider {...settings}>
            {/* Dynamically render slider items */}
            {images &&
              images.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full flex-col items-center justify-center pb-2 lg:pb-5"
                >
                  <Image
                    src={item.image}
                    alt="Dubai Marina"
                    width={600}
                    height={400}
                    className="mx-auto w-full overflow-hidden object-cover"
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default DubaiMarinaSlider;
