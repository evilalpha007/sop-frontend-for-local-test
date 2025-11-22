"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

// Define the data structure for the "home experts"
export type TExpertDataItem = {
  title?: string;
  value?: string;
};

export type TExpert = {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
  data?: TExpertDataItem[] | null;
};

const fallbackResponse: TExpert = {};

type TGetHomeExpertsArgs =
  | {
      country?: string;
    }
  | void
  | null
  | undefined;

export const getHomeExpert = async (
  props: TGetHomeExpertsArgs,
): Promise<TExpert> => {
  try {
    const { queryString } = generateQueryString(props);

    const res = await nextFetch<TResponse<TExpert>>(
      `v1/auth/experts${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return res?.data || fallbackResponse;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/experts' ~ error:", error);
    return fallbackResponse;
  }
};
