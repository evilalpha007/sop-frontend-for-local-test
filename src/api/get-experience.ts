"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TExperienceItem = {
  id?: number;
  icon?: string;
  title?: string;
  counter?: string;
  prefix?: string;
};

export type TExperienceApiData = TExperienceItem[];

const fallbackResponse: TExperienceApiData = [];

// split the counter string into num
const splitCounter = async (
  counter: string | number | null | undefined,
): Promise<{
  numericPart: number;
  textPart: string;
}> => {
  return new Promise<{
    numericPart: number;
    textPart: string;
  }>((resolve, reject) => {
    try {
      const match = String(counter ?? "").match(/^(\d+(\.\d+)?)(\s*(\D+))?$/);
      if (match) {
        const numericPart = parseFloat(match[1]);
        const textPart = match[4]?.trim() || "";
        return resolve({ numericPart, textPart });
      }

      return resolve({ numericPart: 0, textPart: "" });
    } catch (error) {
      // console.log("🚀 ~ splitCounter ~ error:", error);
      return reject({ numericPart: 0, textPart: "" });
    }
  });
};

const processExperienceData = async (
  data: TExperienceApiData,
): Promise<TExperienceApiData> => {
  return new Promise<TExperienceApiData>((resolve, reject) => {
    return (async () => {
      try {
        const experienceData: TExperienceApiData = [];
        for (let index = 0; index < data?.length; index++) {
          const item = data[index];
          const { numericPart, textPart } = await splitCounter(item.counter);
          experienceData.push({
            ...item,
            counter: numericPart.toString(),
            prefix: textPart || undefined,
          });
        }

        return resolve(experienceData);
      } catch (error) {
        // console.log("🚀processExperienceData ~ error:", error);
        reject([]);
      }
    })();
  });
};

type TGetExperienceArgs =
  | {
      country?: string;
    }
  | void
  | null
  | undefined;

export const getExperience = async (
  props: TGetExperienceArgs,
): Promise<TExperienceApiData> => {
  try {
    const { queryString } = generateQueryString(props);

    const res = await nextFetch<TResponse<TExperienceApiData>>(
      `v1/auth/experience${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    console.log("🚀 ~ experience res:", res);

    return await processExperienceData(
      Array.isArray(res?.data) ? res?.data : fallbackResponse,
    );
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/experience' ~ error:", error);
    return fallbackResponse;
  }
};
