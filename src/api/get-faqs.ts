"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TAFaq = {
  id?: number;
  question?: string;
  answer?: string;
};
export type TFaqsData = TAFaq[];

const fallbackResponse: TFaqsData = [];

type TGetHomeExpertsArgs =
  | {
      country?: string;
      limit?: number | string;
    }
  | void
  | undefined
  | null;

export const getFaqs = async (
  props: TGetHomeExpertsArgs,
): Promise<TFaqsData> => {
  try {
    const { queryString } = generateQueryString(props);

    const res = await nextFetch<TResponse<TFaqsData>>(
      `v1/auth/faqs${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return Array.isArray(res?.data) ? res?.data : fallbackResponse;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/faqs' ~ error:", error);
    return fallbackResponse;
  }
};
