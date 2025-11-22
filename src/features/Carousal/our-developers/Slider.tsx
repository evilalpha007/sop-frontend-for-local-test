"use client";
import Button from "@/components/elements/buttons/Button";
import NextImage from "@/components/elements/images/NextImage";
import useDelayedAction from "@/library/hooks/useDelayedAction";
import useInterval from "@/library/hooks/useInterval";
import Link from "next/link";
import React, { memo, useMemo, useState } from "react";

// Define the TDeveloperItemSlides type
interface TDeveloperItemSlides {
  id: number;
  image: string;
  name: string;
  slug: string;
}

const handleChangeSlide = ({
  setCurrentIndex,
  totalDevelopers,
  type,
}: {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  totalDevelopers: number | null | undefined;
  type: "prev" | "next";
}) => {
  return () => {
    setCurrentIndex((prevIndex) => {
      if (!totalDevelopers) return 0;

      if (type === "prev") {
        return prevIndex === 0 ? totalDevelopers - 1 : prevIndex - 1;
      }

      if (type === "next") {
        return prevIndex === totalDevelopers - 1 ? 0 : prevIndex + 1;
      }

      return prevIndex;
    });
  };
};

interface ISliderProps {
  slidesData: TDeveloperItemSlides[] | null | undefined;
  country: string;
}

const Slider = ({ slidesData: developers, country }: ISliderProps) => {
  const totalDevelopers = Number(developers?.length || 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { delayedAction: prevDelayedAction, isWaitingToAction: prevIsLoading } =
    useDelayedAction();
  const { delayedAction: nextDelayedAction, isWaitingToAction: nextIsLoading } =
    useDelayedAction();

  const { eventHandlers } = useInterval({
    onInterval: handleChangeSlide({
      setCurrentIndex,
      totalDevelopers: totalDevelopers,
      type: "next",
    }),
    interval: 5000,
    pauseOnHover: true,
    play: !prevIsLoading || !nextIsLoading,
  });

  const visibleItems = useMemo(() => {
    const totalDevelopers = Number(developers?.length || 0);

    return [
      developers?.[currentIndex],
      developers?.[(currentIndex + 1) % totalDevelopers],
      developers?.[(currentIndex + 2) % totalDevelopers],
    ];
  }, [currentIndex, developers]);

  return (
    <div
      className="relative order-1 w-full md:order-2 md:w-2/3"
      {...eventHandlers}
    >
      <div className="flex items-center justify-center gap-4">
        {/* Previous Button */}
        <Button
          onClick={prevDelayedAction(
            handleChangeSlide({
              setCurrentIndex,
              totalDevelopers: totalDevelopers,
              type: "prev",
            }),
          )}
        >
          <NextImage
            src="/svg-icons/slider/left-shift-arrow.svg"
            alt="previous-arrow"
            width={10}
            height={16}
            disableBlur
            className="h-[14px] w-[9px] shrink-0 cursor-pointer sm:h-8 sm:w-5"
          />

          <span className="sr-only">Previous slide button</span>
        </Button>

        {/* Slider Content */}
        <div className="relative flex h-[300px] w-full items-center justify-center">
          {totalDevelopers > 0 && (
            <div className="flex w-full items-center justify-center gap-2">
              {visibleItems?.map((developer, index) => {
                const isActive = index === 0;

                return (
                  <div
                    key={developer?.id}
                    className={`relative h-full transition-all duration-500 ease-in-out ${
                      isActive
                        ? "w-[80%] scale-100 opacity-100"
                        : "h-full max-w-[10%] scale-90 opacity-60"
                    }`}
                  >
                    {developer ? (
                      <>
                        {isActive && (
                          <>
                            {/* /our-developers/${developer.slug} */}
                            <Link
                              href={`${country === "" ? `/our-developers/${developer.slug}` : `/${country}/our-developers/${developer.slug}`}`}
                              className="block !overflow-hidden !rounded-lg !object-cover"
                            >
                              <NextImage
                                src={developer?.image || ""}
                                alt={developer?.name || "Default Alt Text"}
                                width={800}
                                height={300}
                                className="!overflow-hidden# !rounded-lg# !object-cover# h-full w-full"
                                imageClassName="!object-cover h-full w-full !overflow-hidden"
                                blurDataURL={developer.image}
                              />

                              {isActive && (
                                <span className="absolute bottom-3 left-3 bg-theme-black/70 p-2 px-3 text-sm backdrop-blur-sm">
                                  {developer?.name || ""}
                                </span>
                              )}
                            </Link>
                          </>
                        )}

                        {index === 1 && (
                          <NextImage
                            src={developer.image || ""}
                            alt={developer?.name || "index 1 image"}
                            width={800}
                            height={300}
                            // className="md:-min-h-[220px] h-full min-h-[150px] w-full rounded-md object-cover sm:min-h-[220px] lg:min-h-[300px]"
                            className="h-full min-h-[150px] w-full overflow-hidden rounded-md !object-cover md:min-h-[220px] lg:min-h-[300px]"
                            imageClassName="!object-cover h-full min-h-[150px] md:min-h-[220px] lg:min-h-[300px]"
                            blurDataURL={developer.image}
                          />
                        )}

                        {index === 2 && (
                          <NextImage
                            src={developer.image || ""}
                            alt={developer?.name || "index 2 image"}
                            width={800}
                            height={300}
                            className="h-full min-h-[150px] w-full overflow-hidden rounded-md !object-cover sm:min-h-[220px] md:min-h-[220px] lg:min-h-[280px]"
                            // className="md:-min-h-[220px] sm:min-h-[220px] h-full min-h-[140px] w-full rounded-md object-cover lg:min-h-[280px]"
                            imageClassName="!object-cover min-h-[150px] sm:min-h-[220px] md:min-h-[220px] lg:min-h-[280px]"
                            blurDataURL={developer.image}
                          />
                        )}
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Next Button */}
        <Button
          onClick={nextDelayedAction(
            handleChangeSlide({
              setCurrentIndex,
              totalDevelopers: developers?.length,
              type: "next",
            }),
          )}
        >
          <NextImage
            src="/svg-icons/slider/left-shift-arrow.svg"
            alt="next-arrow"
            width={10}
            height={16}
            disableBlur
            className="h-[14px] w-[9px] shrink-0 rotate-180 cursor-pointer sm:h-8 sm:w-5"
          />

          <span className="sr-only">Next slide button</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(Slider);
