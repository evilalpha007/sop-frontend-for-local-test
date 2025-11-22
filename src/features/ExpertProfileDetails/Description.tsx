"use client";
import React, { useState } from "react";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import parse from "html-react-parser";

interface IDescriptionProps {
  name?: string;
  designation?: string;
  keyPoints?:
    | {
        id?: number | string;
        iconImage?: string;
        label?: string;
        value?: string;
      }[]
    | null;
  description?: string;
  experience?: string;
  languages?: any;
  showExperience?: boolean;
  specialized?: any;
}

const Description = ({
  name,
  designation,
  keyPoints,
  showExperience,
  description,
  experience,
  languages,
  specialized,
}: IDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const wordCount = description?.split(/\s+/).length || 0;
  const shouldTruncate = wordCount > 200;

  const truncateText = (text: string) => {
    if (!shouldTruncate || isExpanded) return text;
    const words = text.split(/\s+/).slice(0, 200).join(" ");
    return words + "...";
  };

  return (
    <div>
      <Typography
        as="h1"
        className="mb-1 text-2xl font-light text-theme-light-golden md:text-[34px]"
      >
        {name}
      </Typography>
      <Typography
        as="p"
        className="mb-0 text-sm font-light text-theme-off-white md:text-lg"
      >
        {designation}
      </Typography>

      {(designation !== "Managing Director" && designation !== "MANAGING DIRECTOR") && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <div className="max-w-content flex items-center gap-2 bg-theme-gray bg-opacity-20">
            <div className="bg-theme-gray bg-opacity-20 px-3 py-2">
              <NextImage
                src="/svg-icons/sales-and-leasing-expert-details/list-checked-icon.svg"
                alt="List Checked Icon"
                width={20}
                height={22}
                className="h-[21.051px] w-[19.417px] shrink-0"
                disableBlur
              />
            </div>

            <div className="flex items-center space-x-1 px-2.5">
              <Typography
                as="h4"
                className="text-xs font-light text-theme-off-white"
              >
                Experience:
              </Typography>
              <Typography
                as="p"
                className="text-xs font-light text-theme-off-white"
              >
                {experience}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-theme-gray bg-opacity-20">
            <div className="bg-theme-gray bg-opacity-20 px-3 py-2">
              <NextImage
                src="/svg-icons/sales-and-leasing-expert-details/pointer-icon.svg"
                alt="List Checked Icon"
                width={20}
                height={22}
                className="h-[21.051px] w-[19.417px] shrink-0"
                disableBlur
              />
            </div>

            <div className="flex items-center space-x-1 px-2.5">
              <Typography
                as="h4"
                className="text-xs font-light text-theme-off-white"
              >
                Specialization:
              </Typography>
              <Typography
                as="p"
                className="text-xs font-light text-theme-off-white"
              >
                {specialized?.name}
              </Typography>
            </div>
          </div>{" "}
          <div className="flex items-center gap-2 bg-theme-gray bg-opacity-20">
            <div className="bg-theme-gray bg-opacity-20 px-3 py-2">
              <NextImage
                src="/svg-icons/sales-and-leasing-expert-details/translation-icon.svg"
                alt="List Checked Icon"
                width={20}
                height={22}
                className="h-[21.051px] w-[19.417px] shrink-0"
                disableBlur
              />
            </div>

            <div className="flex items-center space-x-1 px-2.5">
              <Typography
                as="h4"
                className="text-xs font-light text-theme-off-white"
              >
                Languages:
              </Typography>
              <Typography
                as="p"
                className="text-xs font-light text-theme-off-white"
              >
                {languages?.map((language: any) => language?.name).join(", ")}
              </Typography>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Typography className="text-[12px] font-light leading-[180%] text-theme-off-white md:text-[15px]">
          {parse(truncateText(description ?? ""))}
        </Typography>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm text-theme-light-golden hover:underline focus:outline-none"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Description;
