"use client";
import NextImage from "@/components/elements/images/NextImage";
import Image from "next/image";
import { useState } from "react";
import Slider, { Settings } from "react-slick";

// Custom Previous Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick} className="absolute left-3 top-[45%] z-10">
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
const NextArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick} className="absolute right-3 top-[45%] z-10">
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

interface SliderData {
  src: string;
  title: string;
}

interface ProductDetailsModalSliderProps {
  sliderData: SliderData[];
}

const ProductDetailsModalSlider = ({
  sliderData,
}: ProductDetailsModalSliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings: Settings = {
    customPaging: (i: number) => (
      <div>
        <Image
          width={200}
          height={50}
          src={sliderData[i].src}
          alt={`Thumbnail ${sliderData[i].title}`}
          className="aspect-video h-full !w-[200px] object-cover"
        />
      </div>
    ),
    afterChange: (current: number) => setActiveSlide(current),
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="modalImageSlider2 relative w-full overflow-hidden">
      <div className="slider-container -mb-2">
        <Slider {...settings}>
          {sliderData.map((slide, index) => (
            <div key={index}>
              <Image
                width={512}
                height={768}
                src={slide.src}
                alt={slide.title}
                className="aspect-[11/15] h-full w-full object-cover"
                priority
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductDetailsModalSlider;
