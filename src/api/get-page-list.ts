"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TMeta, TPaginationResponse } from "@/types/common";

export type TPost = {
  id?: number;
  title?: string;
  description?: string;
  feature_image?: string;
  published_date?: string;
  author_name?: string;
  slug?: string;
};

export type TPageListData = TPost[];

type TPageListReturnType = {
  pageListData: any;
  paginationInfo: TMeta;
};

const fallbackResponse: TPageListReturnType = {
  pageListData: [],
  paginationInfo: {
    from: 1,
    last_page: 1,
    to: 1,
    total: 0,
    per_page: 8,
    current_page: 1,
  },
};

type TGetPageListArgs = {
  country?: string;
} | void;

export const getPageList = async (
  props: TGetPageListArgs | { country: string },
): Promise<TPageListReturnType> => {
  try {
    const { queryString } = generateQueryString(props);
    const res = await nextFetch<TPaginationResponse<TPageListData>>(
      `v1/auth/pages${queryString}`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );
    //  // console.log("🚀 ~ home team res:", res);

    return {
      pageListData: Array.isArray(res?.data?.data)
        ? res?.data?.data
        : fallbackResponse.pageListData,
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
    console.error("🚀 ~ 'v1/auth/posts/list-with-featured' ~ error:", error);
    return fallbackResponse;
  }
};
