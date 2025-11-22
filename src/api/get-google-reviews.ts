"use server";
import env from "@/config/env";
import makeAsyncTask from "@/library/utils/make-async-task";

export type TReview = {
  author_name?: string;
  author_url?: string;
  language?: string;
  original_language?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
  translated?: boolean;
};

export type TResult = {
  reviews?: TReview[] | null | undefined;
};

export type TGetGoogleReviewsResponse =
  | {
      html_attributions?: any[];
      result?: TResult | null | undefined;
      status?: string;
    }
  | null
  | undefined;

const fallbackResponse: TReview[] = [];

const getReviewUrls = (country: string | void | null | undefined): string => {
  const dubaiReviewUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJd298v8lpXz4Rn2RujWVuHfM&fields=review&key=AIzaSyBabio9eqS5d_pmKfRotG4P5LvLtot9Veo`;

  switch (country) {
    case "uae":
      return dubaiReviewUrl;
    case "in":
      return `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ7aCDYPojDTkRN_6b7F_FgPE&fields=review&key=AIzaSyBabio9eqS5d_pmKfRotG4P5LvLtot9Veo`;
    default:
      return dubaiReviewUrl;
  }
};

type TGetGoogleReviewsArgs =
  | {
      country?: string;
    }
  | void
  | null
  | undefined;

export const getGoogleReviews = async (
  props: TGetGoogleReviewsArgs,
): Promise<TReview[]> => {
  try {
    const res = await fetch(getReviewUrls(props?.country), {
      // cache: "no-store",
      next: {
        revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
      },
    });

    if (!res.ok) {
      throw new Error("Review fetch response was not ok");
    }

    const data: TGetGoogleReviewsResponse = await res.json();

    return await makeAsyncTask(() => {
      return Array.isArray(data?.result?.reviews)
        ? data?.result?.reviews
        : fallbackResponse;
      // .slice(0, 3);
    });
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/country-list' ~ error:", error);
    return fallbackResponse;
  }
};
