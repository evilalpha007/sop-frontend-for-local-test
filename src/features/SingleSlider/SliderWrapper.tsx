"use client";
import NextImage from "@/components/elements/images/NextImage";
import { cn } from "@/library/utils/cn";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface ISliderArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isRightArrow?: boolean;
}

function Arrow({ className, style, onClick, isRightArrow }: ISliderArrowProps) {
  return (
    <div
      className={cn(
        className,
        "!flex h-[14px] w-[9px] !items-center !justify-center before:!h-0 before:!w-0 before:!content-[''] sm:h-8 sm:w-5",
      )}
      style={style}
      onClick={onClick}
    >
      <NextImage
        src="/svg-icons/slider/left-shift-arrow.svg"
        alt={isRightArrow ? "next-arrow" : "prev-arrow"}
        width={10}
        height={16}
        disableBlur
        className="h-[14px] w-[9px] shrink-0 cursor-pointer sm:h-8 sm:w-5"
        imageClassName={cn(isRightArrow && "rotate-180")}
      />
    </div>
  );
}

const settings = {
  dots: false,
  infinite: true,
  speed: 1500,
  autoplaySpeed: 8000,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <Arrow />,
  nextArrow: <Arrow isRightArrow />,
};

interface ISliderWrapperProps {
  children: React.ReactNode;
  className?: string;
  settings?: Record<string, any>;
}

const SliderWrapper = ({
  children,
  className,
  settings: propsSettings,
}: ISliderWrapperProps) => {
  return (
    <Slider {...{ ...settings, ...propsSettings }} className={cn(className)}>
      {children}
    </Slider>
  );
};

export default SliderWrapper;
