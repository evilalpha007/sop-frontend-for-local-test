"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TGetAchievementsProps =
  | {
      country?: string;
    }
  | null
  | undefined
  | void;

export type TAchievement = {
  id?: number;
  alt_text?: string;
  image?: string;
};

export type TAchievementData = TAchievement[];

const fallbackResponse: TAchievementData = [];

export const getReviews = async (
  args: TGetAchievementsProps,
): Promise<TAchievementData> => {
  try {
    const { queryString } = generateQueryString(args);
    const res = await nextFetch<TResponse<any>>(
      `v1/auth/reviews${queryString}`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return res?.data;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/pop-up' ~ error:", error);
    return fallbackResponse;
  }
};
