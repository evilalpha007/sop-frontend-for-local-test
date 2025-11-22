"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TMeta, TPaginationResponse } from "@/types/common";

export type TGuide = {
  id?: number;
  title?: string;
  slug?: string;
  feature_image?: string;
  published_date?: string;
  description?: string;
  author_name?: string;
  meta_title?: string | null;
  meta_description?: string | null;
};

export type TGuideListData = TGuide[];

type TGuideListReturnType = {
  guideListData: TGuideListData;
  paginationInfo: TMeta;
};

const fallbackResponse: TGuideListReturnType = {
  guideListData: [],
  paginationInfo: {
    from: 1,
    last_page: 1,
    to: 1,
    total: 0,
    per_page: 10,
    current_page: 1,
  },
};

type TGetGuideListArgs = {
  country?: string;
} | void;

export const getDubaiBlogList = async (
  props: TGetGuideListArgs,
): Promise<TGuideListReturnType> => {
  try {
    // Generate query string from provided arguments
    const { queryString } = generateQueryString(props);

    // Fetch data from the API
    const res = await nextFetch<TPaginationResponse<TGuideListData>>(
      `v1/auth/guides${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS, // Cache for 1 hour
        },
      },
    );

    return {
      guideListData: Array.isArray(res?.data?.data)
        ? res?.data?.data
        : fallbackResponse.guideListData,
      paginationInfo: {
        from: res?.data?.from || fallbackResponse.paginationInfo.from,
        last_page:
          res?.data?.last_page || fallbackResponse.paginationInfo.last_page,
        to: res?.data?.to || fallbackResponse.paginationInfo.to,
        total: res?.data?.total || fallbackResponse.paginationInfo.total,
        per_page:
          res?.data?.per_page || fallbackResponse.paginationInfo.per_page,
        current_page:
          res?.data?.current_page ||
          fallbackResponse.paginationInfo.current_page,
      },
    };
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/guides' ~ error:", error);
    return fallbackResponse;
  }
};
