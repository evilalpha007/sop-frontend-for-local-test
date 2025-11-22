"use client";
import NextImage from "@/components/elements/images/NextImage";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import { useEffect, useRef, useState } from "react";

interface ITeamMemberSliderProps {
  id: string;
  image: string;
  position: string;
}

const TeamMemberSlider = () => {
  const [teamMembers, setTeamMembers] = useState<ITeamMemberSliderProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch team data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await nextFetch<TResponse<ITeamMemberSliderProps[]>>(
          // "v1/auth/our-teams/all-data",
          "v1/auth/our-teams/filter",
        );
        if (res?.data) {
          setTeamMembers(res.data);
          setCurrentIndex(res.data.findIndex((member) => member.id === "CEO")); // Initialize with a default member
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Autoplay functionality
  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 2500);
  };

  const clearAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (teamMembers.length > 0) startAutoplay();
    return () => clearAutoplay();
  }); // Added teamMembers as a dependency

  // Handle previous and next
  const handlePrev = () => {
    clearAutoplay();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1,
    );
    startAutoplay();
  };

  const handleNext = () => {
    clearAutoplay();
    setCurrentIndex((prevIndex) =>
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1,
    );
    startAutoplay();
  };

  // Calculate visible team members for carousel
  const getVisibleIndexes = () => {
    const totalItems = teamMembers.length;
    const prevIndex1 = (currentIndex - 2 + totalItems) % totalItems;
    const prevIndex2 = (currentIndex - 1 + totalItems) % totalItems;
    const nextIndex1 = (currentIndex + 1) % totalItems;
    const nextIndex2 = (currentIndex + 2) % totalItems;
    return [prevIndex1, prevIndex2, nextIndex1, nextIndex2];
  };

  // Ensure currentIndex is within valid range
  const validIndex =
    currentIndex >= 0 && currentIndex < teamMembers.length ? currentIndex : 0;

  return (
    <div className="relative mb-7 flex items-center justify-center">
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

      <div className="flex w-full items-center justify-center">
        {/* Render left 2 team members */}
        {getVisibleIndexes()
          .slice(0, 2)
          .map((index, i) => {
            const member = teamMembers[index];
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
                  fill
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
          {!!teamMembers?.[validIndex] && (
            <>
              <NextImage
                src={teamMembers?.[validIndex]?.image || ""}
                alt={teamMembers?.[validIndex]?.position || "Team Member"}
                fill
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
              <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-black/80 to-transparent pb-3 text-center">
                <p className="w-full text-center text-[12px] text-white/80 lg:text-lg">
                  {teamMembers?.[validIndex]?.position ||
                    "Position Not Available"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Render right 2 team members */}
        {getVisibleIndexes()
          .slice(2)
          .map((index, i) => {
            const member = teamMembers[index];
            return (
              <div
                key={member?.id}
                className={`relative animate-fade transition-opacity duration-500 ${
                  i === 0 ? "aspect-[2/3] w-[200px]" : "aspect-[2/3] w-[150px]"
                } transform opacity-70 transition-transform duration-500 hover:scale-105`}
              >
                <NextImage
                  src={member?.image || ""}
                  alt={member?.position || "Team Member"}
                  fill
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

      <button onClick={handleNext}>
        <NextImage
          src="/svg-icons/slider/right-shift-arrow.svg"
          alt="next-arrow"
          width={10}
          height={16}
          disableBlur
          className="h-[14px] w-[9px] shrink-0 cursor-pointer sm:h-8 sm:w-5"
        />
      </button>
    </div>
  );
};

export default TeamMemberSlider;
