"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TDeveloper = {
  id: number;
  image: string;
  name: string;
  slug: string;
};

export type TDeveloperData = TDeveloper[];

const fallbackResponse: TDeveloperData = [];

export const getOurDevelopers = async (
  args?: Record<string, any>,
): Promise<TDeveloperData> => {
  try {
    const { queryString } = generateQueryString(args);
    const res = await nextFetch<TResponse<TDeveloperData>>(
      `v1/auth/developers${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return Array.isArray(res?.data) ? res.data : fallbackResponse;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/developers' ~ error:", error);
    return fallbackResponse;
  }
};
