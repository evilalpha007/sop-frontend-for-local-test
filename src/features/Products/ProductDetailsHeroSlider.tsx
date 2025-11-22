"use client";
import NextImage from "@/components/elements/images/NextImage";
import { memo, useEffect, useState } from "react";

type GalleryImage = {
  id: number;
  image: string;
  blurDataUrl?: string;
};

interface IProductDetailsHeroSliderProps {
  data: {
    id: number;
    gallery_and_title: {
      title: string;
      slug: string;
      gallery_images: GalleryImage[];
    };
  };
  propertySliderImages?: GalleryImage[] | null;
}

const ProductDetailsHeroSlider = ({ data }: IProductDetailsHeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bottomStartIndex, setBottomStartIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const sliderData = data?.gallery_and_title?.gallery_images || [];

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxBottomItemsLargeScreen = 10;
  const maxBottomItemsSmallScreen = 7;

  const visibleThumbnails = isLargeScreen
    ? sliderData.slice(
        bottomStartIndex,
        bottomStartIndex + maxBottomItemsLargeScreen
      )
    : sliderData.slice(0, maxBottomItemsSmallScreen);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);

    if (isLargeScreen) {
      if (index >= bottomStartIndex + maxBottomItemsLargeScreen) {
        setBottomStartIndex(index - maxBottomItemsLargeScreen + 1);
      } else if (index < bottomStartIndex) {
        setBottomStartIndex(index);
      }
    }
  };

  return (
    <div>
      <div className="flex w-full flex-col items-start gap-4 md:flex-row">
        <div className="hidden h-full w-full items-center justify-between gap-2.5 md:flex-col lg:flex lg:w-1/5 2xl:gap-3">
          {sliderData.slice(0, 3).map((item, index) => (
            <div
              key={item.id}
              className={`aspect-[17/13] h-full w-full cursor-pointer border ${
                currentIndex === index
                  ? "border-theme-light-golden"
                  : "border-theme-off-golden"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <NextImage
                width={500}
                height={500}
                src={item.image}
                blurDataURL={item.blurDataUrl}
                alt={`Thumbnail ${item.id}`}
                className="aspect-[16/10] h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex w-full flex-1 flex-col gap-4 lg:w-4/5">
          <div className="aspect-[16/10] w-full flex-grow">
            <NextImage
              width={500}
              height={500}
              src={sliderData[currentIndex]?.image || ""}
              blurDataURL={sliderData[currentIndex]?.blurDataUrl}
              alt={`Main Image ${sliderData[currentIndex]?.id}`}
              className="aspect-[16/10] h-full w-full border border-theme-off-golden !object-cover"
              imageClassName="!object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Thumbnails */}
      <div className="mt-1 flex w-full justify-between gap-1 overflow-hidden lg:mt-4 lg:gap-4">
        {visibleThumbnails.map((item, index) => {
          const adjustedIndex = isLargeScreen ? bottomStartIndex + index : index;
          return (
            <div
              key={item.id}
              className={`aspect-[16/12] h-full w-full cursor-pointer overflow-hidden border ${
                currentIndex === adjustedIndex
                  ? "border-theme-light-golden"
                  : "border-theme-off-golden"
              }`}
              onClick={() => handleThumbnailClick(adjustedIndex)}
            >
              <NextImage
                width={200}
                height={200}
                src={item.image}
                blurDataURL={item.blurDataUrl}
                alt={`Thumbnail ${item.id}`}
                className="h-full w-full !object-cover"
                imageClassName="!object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ProductDetailsHeroSlider);
