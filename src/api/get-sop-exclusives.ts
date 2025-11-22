"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

// Define types for the SOP Exclusive properties
export type TSopExclusiveItem = {
  id?: number;
  first_col_title?: string;
  first_col_range?: string;
  first_col_subtitle?: string;
  first_col_header?: string;
  first_col_sub_header?: string;
  second_col_title?: string;
  second_col_range?: string;
  second_col_subtitle?: string;
  second_col_header?: string;
  second_col_sub_header?: string;
  description?: string;
  footer_text?: string;
  learn_more_url?: string;
  image?: string;
  alt_text?: string;
};

export type TSopExclusivesData = TSopExclusiveItem[];

const fallbackResponse: TSopExclusivesData = [];

type TGetSopExclusivesArgs =
  | {
      country?: string;
    }
  | void
  | null
  | undefined;

export const getSopExclusives = async (
  props: TGetSopExclusivesArgs,
): Promise<TSopExclusivesData> => {
  try {
    const { queryString } = generateQueryString(props);

    const res = await nextFetch<TResponse<TSopExclusivesData>>(
      `v1/auth/sop-exclusive${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return Array.isArray(res?.data) ? res?.data : fallbackResponse;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/sop-exclusive' ~ error:", error);
    return fallbackResponse;
  }
};
