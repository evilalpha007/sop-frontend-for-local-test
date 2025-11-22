"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TCommunity = {
  id: number;
  image: string;
  name: string;
  slug: string;
};

export type TCommunityData = TCommunity[];

const fallbackResponse: TCommunityData = [];

export const getLifeStyle = async (
  args?: Record<string, any>,
): Promise<TCommunityData> => {
  try {
    const { queryString } = generateQueryString(args);
    const res = await nextFetch<TResponse<TCommunityData>>(
      `v1/auth/communities${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return Array.isArray(res?.data) ? res.data : fallbackResponse;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/communities' ~ error:", error);
    return fallbackResponse;
  }
};
