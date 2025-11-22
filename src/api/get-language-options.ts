"use server";
import env from "@/config/env";
import makeAsyncTask from "@/library/utils/make-async-task";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TLanguage = {
  id?: number;
  name?: string;
};
export type TLanguagesData = TLanguage[];
const fallbackResponse: TLanguage[] = [];

export type TLanguageOption = {
  label: string;
  value: string;
};
export type TLanguageOptions = TLanguageOption[];
const fallbackLanguageOptions: TLanguageOptions = [];

const processLanguageOptions = (data: TLanguagesData) => {
  try {
    const options: TLanguageOption[] = data?.map((language) => ({
      label: language?.name ?? "",
      value: String(language?.id ?? ""),
    }));

    return options;
  } catch (error) {
    // console.log("🚀 processLanguageOptions ~ error:", error);
    return fallbackLanguageOptions;
  }
};

export const getLanguageOptions = async (): Promise<TLanguageOptions> => {
  try {
    const res = await nextFetch<TResponse<TLanguagesData>>(
      `v1/auth/our-teams/languages`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    const languagesData: TLanguage[] = Array.isArray(res?.data)
      ? res?.data
      : fallbackResponse;

    const languageOptions: TLanguageOptions = await makeAsyncTask(() =>
      processLanguageOptions(languagesData),
    );

    return languageOptions;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/our-teams/all-data' ~ error:", error);
    return fallbackLanguageOptions;
  }
};
