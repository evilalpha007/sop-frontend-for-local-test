"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TPost = {
  id?: number;
  title?: string;
  slug?: string;
  short_description?: string;
  feature_image?: string;
  published_date?: string;
  // author_id?: number;
  author_name?: string | null | undefined;
};

export type TFeatureBlogData = {
  featured_post?: TPost | null;
  all_posts?: TPost[] | null;
};

const fallbackResponse: NonNullable<Required<TFeatureBlogData>> = {
  featured_post: {},
  all_posts: [],
};

type TGetHomeTeamArgs = {
  country?: string;
} | void;

export const getNonResidentialBlogs = async (
  props: TGetHomeTeamArgs,
): Promise<TFeatureBlogData> => {
  try {
    const { queryString } = generateQueryString(props);
    const res = await nextFetch<TResponse<TFeatureBlogData>>(
      `v1/auth/posts/non-residential${queryString}`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    // const ourTeamData: TFeatureBlogData = res?.data || fallbackResponse;
    return {
      all_posts: Array.isArray(res?.data)
        ? res?.data
        : fallbackResponse.all_posts,
    };
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/posts/list-with-featured' ~ error:", error);
    return fallbackResponse;
  }
};
