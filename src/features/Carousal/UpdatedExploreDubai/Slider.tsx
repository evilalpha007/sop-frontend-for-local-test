"use client";
import { TGuideItemSlides } from "@/api/get-home-guide";
import Button from "@/components/elements/buttons/Button";
import NextImage from "@/components/elements/images/NextImage";
import useDelayedAction from "@/library/hooks/useDelayedAction";
import useInterval from "@/library/hooks/useInterval";
import Link from "next/link";
import React, { memo, useMemo, useState } from "react";

const handleChangeSlide = ({
  setCurrentIndex,
  totalGuides,
  type,
}: {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  totalGuides: number | null | undefined;
  type: "prev" | "next";
}) => {
  return () => {
    setCurrentIndex((prevIndex) => {
      if (!totalGuides) return 0;

      if (type === "prev") {
        return prevIndex === 0 ? totalGuides - 1 : prevIndex - 1;
      }

      if (type === "next") {
        return prevIndex === totalGuides - 1 ? 0 : prevIndex + 1;
      }

      return prevIndex;
    });
  };
};

interface ISliderProps {
  slidesData: TGuideItemSlides | null | undefined;
}

const Slider = ({ slidesData: guides }: ISliderProps) => {
  const totalGuides = Number(guides?.length || 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { delayedAction: prevDelayedAction, isWaitingToAction: prevIsLoading } =
    useDelayedAction();
  const { delayedAction: nextDelayedAction, isWaitingToAction: nextIsLoading } =
    useDelayedAction();

  const { eventHandlers, isPaused } = useInterval({
    onInterval: handleChangeSlide({
      setCurrentIndex,
      totalGuides: totalGuides,
      type: "next",
    }),
    interval: 5000,
    pauseOnHover: true,
    play: !prevIsLoading || !nextIsLoading,
  });

  const visibleItems = useMemo(() => {
    const totalGuides = Number(guides?.length || 0);

    return [
      guides?.[currentIndex],
      guides?.[(currentIndex + 1) % totalGuides],
      guides?.[(currentIndex + 2) % totalGuides],
    ];
  }, [currentIndex, guides]);

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
              totalGuides: totalGuides,
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
          {totalGuides > 0 && (
            <div className="flex w-full items-center justify-center gap-2">
              {visibleItems?.map((guide, index) => {
                const isActive = index === 0;

                return (
                  <div
                    key={guide?.id}
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
                              href={`/exclusive-areas/${guide.slug}`}
                              className="block !overflow-hidden !rounded-lg !object-cover"
                            >
                              <NextImage
                                src={guide?.image || ""}
                                alt={
                                  guide?.category?.name || "Default Alt Text"
                                }
                                width={800}
                                height={300}
                                className="!overflow-hidden# !rounded-lg# !object-cover# h-full w-full"
                                imageClassName="!object-cover h-full w-full !overflow-hidden"
                                blurDataURL={guide.blurDataUrl}
                              />

                              {isActive && (
                                <span className="absolute bottom-3 left-3 bg-theme-black/70 p-2 px-3 text-sm backdrop-blur-sm">
                                  {guide?.category?.name || ""}
                                </span>
                              )}
                            </Link>
                          </>
                        )}

                        {index === 1 && (
                          <NextImage
                            src={guide.image || ""}
                            alt={guide?.category?.name || "index 1 image"}
                            width={800}
                            height={300}
                            // className="md:-min-h-[220px] h-full min-h-[150px] w-full rounded-md object-cover sm:min-h-[220px] lg:min-h-[300px]"
                            className="h-full min-h-[150px] w-full overflow-hidden rounded-md !object-cover md:min-h-[220px] lg:min-h-[300px]"
                            imageClassName="!object-cover h-full min-h-[150px] md:min-h-[220px] lg:min-h-[300px]"
                            blurDataURL={guide.blurDataUrl}
                          />
                        )}

                        {index === 2 && (
                          <NextImage
                            src={guide.image || ""}
                            alt={guide.category.name || "index 2 image"}
                            width={800}
                            height={300}
                            className="h-full min-h-[150px] w-full overflow-hidden rounded-md !object-cover sm:min-h-[220px] md:min-h-[220px] lg:min-h-[280px]"
                            // className="md:-min-h-[220px] sm:min-h-[220px] h-full min-h-[140px] w-full rounded-md object-cover lg:min-h-[280px]"
                            imageClassName="!object-cover min-h-[150px] sm:min-h-[220px] md:min-h-[220px] lg:min-h-[280px]"
                            blurDataURL={guide.blurDataUrl}
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
              totalGuides: guides?.length,
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
