"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TReadAlso = {
  id?: number | null;
  title?: string | null;
  slug?: string | null;
  short_description?: string | null;
  feature_image?: string | null;
  published_date?: string | null;
  author_name?: string | null;
};

export type TData = {
  id?: number | null;
  title?: string | null;
  slug?: string | null;
  short_description?: string | null;
  description?: string | null;
  alt_text?: null | string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keyword?: string | null;
  feature_image?: string | null;
  published_date?: string | null;
  author_name?: string | null;
  read_also?: TReadAlso[] | null;
};

type TGetBlogDetailsReturn = {
  blogData: Omit<TData, "read_also">;
  read_also: TReadAlso[];
  isBlogNotFound: boolean;
};

const fallbackData: TGetBlogDetailsReturn = {
  blogData: {},
  read_also: [],
  isBlogNotFound: true,
};

type TGetBlogDetailsArgs = {
  country?: string;
  slug: string | null | undefined;
} | void;

export const getBlogDetails = async (
  props: TGetBlogDetailsArgs,
): Promise<TGetBlogDetailsReturn> => {
  const { slug, ...restProps } = props || {};
  // console.log("🚀 blog details ~ { slug, ...restProps }: ", { slug, restProps })

  try {
    if (!slug) {
      throw new Error("Not a valid blog slug");
    }

    const { queryString } = generateQueryString(restProps);
    // console.log("blog details url: ", `v1/auth/posts/${slug}${queryString}`);
    const res = await nextFetch<TResponse<TData>>(
      `v1/auth/posts/${slug}${queryString}`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    if (!res || !res?.data || Array.isArray(res?.data)) {
      throw new Error(res?.message || "Blog not found");
    }

    const { read_also, ...blogData } = res.data;

    return {
      blogData,
      read_also: Array.isArray(res.data.read_also) ? res.data.read_also : [],
      isBlogNotFound: false,
    };
  } catch (error) {
    console.error("Error getting blog details", error);
    return fallbackData;
  }
};
