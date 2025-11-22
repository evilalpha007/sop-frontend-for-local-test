"use client";
import { getHomeGuides } from "@/api/get-home-guide"; // Import the API function
import Section from "@/components/blocks/Section";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const ExploreDubai = () => {
  const [guides, setGuides] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Hover state to stop autoplay

  // Fetch the home guides data
  useEffect(() => {
    const fetchGuides = async () => {
      const guideData = await getHomeGuides({});
      // console.log(guideData); // Log the fetched data to inspect its structure
      setGuides(guideData || []);
    };

    fetchGuides();
  }, []);

  // Navigate to the previous slide
  const handlePrev = useCallback(() => {
    if (isSliding) return; // Prevent multiple clicks during sliding
    setIsSliding(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex - 1 + guides.length) % guides.length;
      });
      setIsSliding(false);
    }, 300);
  }, [guides.length, isSliding]);

  // Navigate to the next slide
  const handleNext = useCallback(() => {
    if (isSliding) return; // Prevent multiple clicks during sliding
    setIsSliding(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % guides.length;
      });
      setIsSliding(false);
    }, 300);
  }, [guides.length, isSliding]);

  // Get the next 3 items (looping back around the array if necessary)
  const getSlides = () => {
    const nextIndex = currentIndex % guides.length;
    return [
      guides[nextIndex],
      guides[(nextIndex + 1) % guides.length],
      guides[(nextIndex + 2) % guides.length],
    ];
  };

  // Auto play every 3 seconds
  useEffect(() => {
    if (!guides.length || isHovered) return; // Ensure guides data is available and stop autoplay on hover

    const autoSlide = setInterval(() => {
      if (!isSliding) {
        handleNext(); // Trigger next slide
      }
    }, 3000); // 3 seconds interval

    return () => clearInterval(autoSlide); // Cleanup interval on component unmount
  }, [isHovered, isSliding, guides.length, handleNext]); // Include handleNext and isSliding in dependencies

  return (
    <Section.Container>
      <div
        className="my-7 flex w-full flex-col items-center justify-center gap-0 md:flex-row md:gap-12"
        onMouseEnter={() => setIsHovered(true)} // Stop autoplay when mouse enters
        onMouseLeave={() => setIsHovered(false)} // Resume autoplay when mouse leaves
      >
        {/* Info Section */}
        <div className="order-2 w-full p-3 text-start md:order-1 md:w-2/6">
          <Typography className="text-2xl text-theme-light-golden lg:text-3xl">
            {`Dubai's`} Exclusives
          </Typography>
          <p className="mt-3 text-sm font-light opacity-90 md:text-[15px]">
            Looking for the perfect area to call home? <br /> Explore
            neighborhoods that offer the perfect balance of serene views and
            convenience.
          </p>
          <div className="mt-7 w-full md:mt-10">
            <Link
              className="flex w-full flex-col items-center justify-center border border-transparent bg-theme-light-golden p-2 px-10 text-center text-sm text-black md:w-fit md:border-slate-400/50 md:bg-transparent md:p-3.5 md:px-12 md:text-lg md:text-theme-light-golden"
              href="/dubai-exclusives"
            >
              CLICK NOW
            </Link>
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative order-1 w-full md:order-2 md:w-2/3">
          <div className="flex items-center justify-center gap-4">
            {/* Previous Button */}
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

            {/* Slider Content */}
            <div className="relative flex h-[300px] w-full items-center justify-center">
              {guides.length > 0 && (
                <div className="flex w-full items-center justify-center gap-2">
                  {getSlides().map((guide, index) => {
                    const isActive = index === 0;
                    return (
                      <div
                        key={guide.id}
                        className={`relative h-full transition-all duration-500 ease-in-out ${
                          isActive
                            ? "w-[80%] scale-100 opacity-100"
                            : "h-full max-w-[10%] scale-90 opacity-60"
                        }`}
                      >
                        {guide?.category ? (
                          <>
                            {isActive && (
                              <>
                                <Link
                                  target="_blank"
                                  href={`/dubai-exclusives/${guide?.slug}`}
                                >
                                  <Image
                                    src={guide?.image || "/fallback-image.jpg"}
                                    alt={
                                      guide?.category?.name ||
                                      "Default Alt Text"
                                    }
                                    width={800}
                                    height={300}
                                    className="h-full w-full rounded-md object-cover"
                                  />
                                  {/* show only active span */}
                                  {isActive && (
                                    <span className="absolute bottom-3 left-3 bg-theme-black/70 p-2 px-3 text-sm backdrop-blur-sm">
                                      {guide?.category?.name || ""}
                                    </span>
                                  )}
                                </Link>
                              </>
                            )}
                            {/* Index 1 */}
                            {index === 1 && (
                              <Image
                                src={guide.image}
                                alt={guide.category.name}
                                width={800}
                                height={300}
                                className="md:-min-h-[220px] h-full min-h-[150px] w-full rounded-md object-cover sm:min-h-[220px] lg:min-h-[300px]"
                              />
                            )}
                            {/* Index 2 */}
                            {index === 2 && (
                              <Image
                                src={guide.image}
                                alt={guide.category.name}
                                width={800}
                                height={300}
                                className="md:-min-h-[220px] sm:min-h-2200px] h-full min-h-[140px] w-full rounded-md object-cover lg:min-h-[280px]"
                              />
                            )}
                          </>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
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
      </div>
    </Section.Container>
  );
};

export default ExploreDubai;
