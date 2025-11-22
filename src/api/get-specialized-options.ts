"use server";
import env from "@/config/env";
import makeAsyncTask from "@/library/utils/make-async-task";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TSpecialized = {
  id?: number;
  name?: string;
};

export type TSpecializedData = TSpecialized[];

export type TOptions = {
  label: string;
  value: string;
}[];

const fallbackOptions: TOptions = [];

const processSpecializedOptions = (
  specializedListData: TSpecializedData,
): TOptions => {
  try {
    const options: TOptions =
      specializedListData?.map((specialized) => ({
        label: specialized?.name ?? "",
        value: String(specialized?.id ?? ""),
      })) ?? fallbackOptions;

    return options;
  } catch (error) {
    // console.log("🚀 processSpecializedOptions ~ error:", error);
    return fallbackOptions;
  }
};

const fallbackResponse: TSpecializedData = [];

export const getSpecializedOptions = async (): Promise<TOptions> => {
  try {
    const res = await nextFetch<TResponse<TSpecializedData>>(
      "v1/auth/our-teams/specializeds",
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    const specializedListData: TSpecializedData = Array.isArray(res?.data)
      ? res?.data
      : fallbackResponse;

    const options = await makeAsyncTask(() =>
      processSpecializedOptions(specializedListData),
    );

    return options ?? fallbackOptions;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/our-teams/specializeds' ~ error:", error);
    return fallbackOptions;
  }
};
