"use client";
import NextImage from "@/components/elements/images/NextImage";
import Image from "next/image";
import Slider from "react-slick";

// Custom Previous Arrow
const PrevArrow = ({ onClick }: any) => {
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
const NextArrow = ({ onClick }: any) => {
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

const ModalSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const images = [
    "/images/carousels/hero-modal-slider/01.svg",
    "/images/carousels/hero-modal-slider/01.svg",
    "/images/carousels/hero-modal-slider/01.svg",
    "/images/carousels/hero-modal-slider/01.svg",
  ];
  return (
    <div className="modalImageSlider relative w-full overflow-hidden">
      <div className="slider-container -mb-2">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <Image
                width={512}
                height={768}
                src={image}
                alt="slider image"
                className="aspect-[11/15] h-full w-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ModalSlider;
