"use client";
import { TTeamExperts } from "@/api/get-all-team-expert";
import Button from "@/components/elements/buttons/Button";
import NextImage from "@/components/elements/images/NextImage";
import useInterval from "@/library/hooks/useInterval";
import { memo, useMemo, useState } from "react";

interface ISliderProps {
  teamMembers: TTeamExperts | null | undefined;
}

type HandleChangeSlide = (props: {
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
  totalTeamMembers?: number;
  type: "prev" | "next";
}) => () => void;

const handleChangeSlide: HandleChangeSlide = ({
  type,
  setCurrentIndex,
  totalTeamMembers,
}) => {
  return () => {
    const teamMembers = Number(totalTeamMembers || 0);
    setCurrentIndex?.((prevIndex) => {
      if (!teamMembers) return 0;

      if (type === "prev") {
        return prevIndex === 0 ? teamMembers - 1 : prevIndex - 1;
      }

      if (type === "next") {
        return prevIndex === teamMembers - 1 ? 0 : prevIndex + 1;
      }

      return prevIndex;
    });
  };
};

const Slider = ({ teamMembers }: ISliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalTeamMembers = Number(teamMembers?.length || 0);
  const { eventHandlers } = useInterval({
    onInterval: handleChangeSlide({
      setCurrentIndex,
      totalTeamMembers,
      type: "next",
    }),
    interval: 3000,
    pauseOnHover: true,
  });

  // Calculate visible team members for carousel
  const visibleIndexes = useMemo(() => {
    const totalItems = totalTeamMembers;
    const prevIndex1 = (currentIndex - 2 + totalItems) % totalItems;
    const prevIndex2 = (currentIndex - 1 + totalItems) % totalItems;
    const nextIndex1 = (currentIndex + 1) % totalItems;
    const nextIndex2 = (currentIndex + 2) % totalItems;

    // return [prevIndex1, prevIndex2, nextIndex1, nextIndex2];
    return {
      left: [prevIndex1, prevIndex2],
      center: currentIndex % totalItems,
      right: [nextIndex1, nextIndex2],
    };
  }, [currentIndex, totalTeamMembers]);

  // Ensure currentIndex is within valid range
  //   const validIndex =
  //     currentIndex >= 0 && currentIndex < totalTeamMembers ? currentIndex : 0;

  return (
    <div className="relative mb-7 flex items-center justify-center">
      <Button
        onClick={handleChangeSlide({
          setCurrentIndex,
          totalTeamMembers,
          type: "prev",
        })}
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

      <div
        className="flex w-full items-center justify-center"
        {...eventHandlers}
      >
        {/* Render left 2 team members */}
        {visibleIndexes?.left?.map((index, i) => {
          const member = teamMembers?.[index];

          return (
            <div
              key={member?.id}
              className={`relative animate-fade transition-opacity duration-500 ${
                i === 1 ? "aspect-[2/3] w-[200px]" : "aspect-[2/3] w-[150px]"
              } transform opacity-70 transition-transform duration-500 hover:scale-105`}
            >
              <NextImage
                src={member?.image || ""}
                alt={member?.position || "Team Member"}
                width={210}
                height={315}
                blurDataURL={member?.blurDataUrl}
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
              <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-black/40 to-transparent pb-3 text-center">
                <p className="hidden w-full text-center text-[12px] text-white opacity-80 lg:block">
                  {member?.position || "Position Not Available"}
                </p>
              </div>
            </div>
          );
        })}

        {/* Current team member in the center */}
        <div className="relative z-10 aspect-[2/3] w-[300px] scale-110 transform animate-fade opacity-100 shadow-xl transition-transform duration-500">
          {/* Check if currentIndex is within bounds */}
          {!!teamMembers?.[visibleIndexes?.center] && (
            <>
              <NextImage
                src={teamMembers?.[visibleIndexes?.center]?.image || ""}
                alt={
                  teamMembers?.[visibleIndexes?.center]?.position ||
                  "Team Member"
                }
                blurDataURL={teamMembers?.[visibleIndexes?.center]?.blurDataUrl}
                width={330}
                height={495}
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
              <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-black/80 to-transparent pb-3 text-center">
                <p className="w-full text-center text-[12px] text-white/80 lg:text-lg">
                  {teamMembers?.[visibleIndexes?.center]?.position ||
                    "Position Not Available"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Render right 2 team members */}
        {visibleIndexes?.right?.map((index, i) => {
          const member = teamMembers?.[index];

          return (
            <div
              key={member?.id}
              className={`relative animate-fade transition-opacity duration-500 ${
                i === 0 ? "aspect-[2/3] w-[200px]" : "aspect-[2/3] w-[150px]"
              } transform opacity-70 transition-transform duration-500 hover:scale-105`}
            >
              <NextImage
                src={member?.image || ""} // Default fallback image if image is missing
                alt={member?.position || "Team Member"}
                blurDataURL={member?.blurDataUrl}
                width={210}
                height={315}
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
              <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-black/40 to-transparent pb-3 text-center">
                <p className="hidden w-full text-center text-[12px] text-white opacity-80 lg:block">
                  {member?.position || "Position Not Available"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={handleChangeSlide({
          setCurrentIndex,
          totalTeamMembers,
          type: "next",
        })}
      >
        <NextImage
          src="/svg-icons/slider/right-shift-arrow.svg"
          alt="next-arrow"
          width={10}
          height={16}
          disableBlur
          className="h-[14px] w-[9px] shrink-0 cursor-pointer sm:h-8 sm:w-5"
        />

        <span className="sr-only">Previous slide button</span>
      </Button>
    </div>
  );
};

export default memo(Slider);
