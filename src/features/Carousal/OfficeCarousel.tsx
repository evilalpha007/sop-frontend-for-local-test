"use client";
import Section from "@/components/blocks/Section";
import NextImage from "@/components/elements/images/NextImage";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Title from "../TextBlock/Title";

const OfficeCarousel = () => {
  const sliderData = [
    {
      id: "1",
      image: "/images/carousels/office/01.png",
    },
    {
      id: "2",
      image: "/images/carousels/office/02.png",
    },
    {
      id: "3",
      image: "/images/carousels/office/03.png",
    },
    {
      id: "4",
      image: "/images/carousels/office/04.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const handlePrev = () => {
    if (isSliding) return;

    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1,
      );
      setIsSliding(false);
    }, 300); // Increased time for smoother transition
  };

  const handleNext = () => {
    if (isSliding) return;

    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1,
      );
      setIsSliding(false);
    }, 300); // Increased time for smoother transition
  };

  const handleThumbnailClick = (index: any) => {
    if (isSliding) return;

    setCurrentIndex(index); // Set main image to the clicked thumbnail index
  };

  return (
    <Section.Container>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full max-w-4xl justify-between md:mb-4">
          <Title className="w-full text-center text-xl font-light text-white md:text-3xl">
            Visit our office
          </Title>
        </div>

        <div
          className={`relative my-3 flex w-full flex-col items-center justify-center gap-5 md:flex-row ${isSliding ? "sliding" : ""}`}
        >
          {/* Main Image (50% width) */}
          <div className="relative flex w-full flex-col items-center overflow-hidden md:w-1/2">
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <button onClick={handlePrev}>
                <NextImage
                  src="/svg-icons/slider/left-shift-arrow.svg"
                  alt="previous-arrow"
                  width={10}
                  height={16}
                  disableBlur
                  className="h-[14px] w-[9px] shrink-0 cursor-pointer sm:h-8 sm:w-5"
                />
              </button>
              <div
                className={`w-full transition-opacity duration-1000 ${isSliding ? "opacity-0" : "opacity-100"}`}
              >
                <NextImage
                  width={600}
                  height={400}
                  src={sliderData?.[currentIndex]?.image || ""}
                  alt={`Slide ${sliderData[currentIndex].id}`}
                  className="h-auto w-full"
                />
                <div className="mt-3 hidden w-full md:block">
                  <Link
                    target="_blank"
                    href={
                      "https://www.google.com/maps?ll=25.189864,55.284438&z=16&t=m&hl=en&gl=AE&mapclient=embed&q=Fifty+One+Tower+Marasi+Dr+Business+Bay+-+Dubai"
                    }
                    className="block w-full bg-theme-light-golden p-1.5 text-center font-medium text-theme-black"
                  >
                    View on Map
                  </Link>
                </div>
              </div>
              {/* Next Button */}
              <button onClick={handleNext}>
                <NextImage
                  src="/svg-icons/slider/left-shift-arrow.svg"
                  alt="next-arrow"
                  width={10}
                  height={16}
                  disableBlur
                  className="h-[14px] w-[9px] shrink-0 rotate-180 cursor-pointer sm:h-8 sm:w-5"
                />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex w-[90%] items-center justify-center gap-4 md:w-1/2">
            <div
              className={`flex-1 transition-opacity duration-1000 ${isSliding ? "opacity-0" : "opacity-100"}`}
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  handleThumbnailClick((currentIndex + 1) % sliderData.length)
                }
              >
                <NextImage
                  src={
                    sliderData?.[(currentIndex + 1) % sliderData.length]
                      ?.image || ""
                  }
                  width={300}
                  height={200}
                  alt="Thumbnail 1"
                  className="h-auto w-full opacity-50 transition-opacity duration-500 hover:opacity-100"
                />
              </div>
            </div>
            <div
              className={`flex-1 transition-opacity duration-1000 ${isSliding ? "opacity-0" : "opacity-100"}`}
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  handleThumbnailClick((currentIndex + 2) % sliderData.length)
                }
              >
                <Image
                  width={300}
                  height={200}
                  src={sliderData[(currentIndex + 2) % sliderData.length].image}
                  alt="Thumbnail 2"
                  className="h-auto w-full opacity-50 transition-opacity duration-500 hover:opacity-100"
                />
              </div>
            </div>
            <div
              className={`flex-1 transition-opacity duration-1000 md:hidden ${isSliding ? "opacity-0" : "opacity-100"}`}
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  handleThumbnailClick((currentIndex + 3) % sliderData.length)
                }
              >
                <Image
                  width={300}
                  height={200}
                  src={sliderData[(currentIndex + 3) % sliderData.length].image}
                  alt="Thumbnail 3"
                  className="h-auto w-full opacity-50 transition-opacity duration-500 hover:opacity-100"
                />
              </div>
            </div>
            <div
              className={`flex-1 transition-opacity duration-1000 md:hidden ${isSliding ? "opacity-0" : "opacity-100"}`}
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  handleThumbnailClick((currentIndex + 4) % sliderData.length)
                }
              >
                <Image
                  width={300}
                  height={200}
                  src={sliderData[(currentIndex + 4) % sliderData.length].image}
                  alt="Thumbnail 4"
                  className="h-auto w-full opacity-50 transition-opacity duration-500 hover:opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-2 md:hidden">
            <Link
              target="_blank"
              href={
                "https://www.google.com/maps?ll=25.189864,55.284438&z=16&t=m&hl=en&gl=AE&mapclient=embed&q=Fifty+One+Tower+Marasi+Dr+Business+Bay+-+Dubai"
              }
              className="block w-full bg-theme-light-golden p-1.5 text-center font-medium text-theme-black"
            >
              View on Map
            </Link>
          </div>
        </div>
      </div>
    </Section.Container>
  );
};

export default OfficeCarousel;
