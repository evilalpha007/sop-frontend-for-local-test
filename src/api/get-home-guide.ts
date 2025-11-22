"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { generateBlurDataUrl } from "@/library/utils/image";
import makeAsyncTask from "@/library/utils/make-async-task";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TGuideItem = {
  id: number;
  slug?: string;
  image?: string;
  category?: {
    id: number;
    name?: string;
    slug?: string;
  };
};

export type TGuideData = TGuideItem[];

const fallbackResponse: TGuideData = [];

export type TGuideItemSlide = TGuideItem & {
  blurDataUrl: string;
};

export type TGuideItemSlides = TGuideItemSlide[];

const guideItemSlidesFallback: TGuideItemSlides = [];

const processGuideItemSlides = async (
  data: TGuideData,
): Promise<TGuideItemSlides> => {
  const guideItemSlides: TGuideItemSlides = [];

  for (const guideSlide of data) {
    const blurDataUrl = await generateBlurDataUrl(guideSlide.image);
    guideItemSlides.push({ ...guideSlide, blurDataUrl });
  }

  return guideItemSlides;
};

type TGetGuideArgs = {
  country?: string;
} | void;

export const getHomeGuides = async (
  props: TGetGuideArgs,
): Promise<TGuideItemSlides> => {
  try {
    const { queryString } = generateQueryString(props);

    const res = await nextFetch<TResponse<TGuideData>>(
      `v1/auth/guides/home-page${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return await makeAsyncTask(() =>
      processGuideItemSlides(
        Array.isArray(res?.data) ? res?.data : fallbackResponse,
      ),
    );
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/guides/home-page' ~ error:", error);
    return guideItemSlidesFallback;
  }
};
