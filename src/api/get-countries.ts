"use server";
import env from "@/config/env";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TCountry = {
  id?: number;
  code?: string;
  flag?: string;
};

export type TCountryCode = TCountry["code"];

export type TCountriesData = {
  default: TCountry | null | undefined;
  data: TCountry[] | null | undefined;
};

export type TGetCountriesReturn = {
  defaultCountry: TCountry;
  countries: TCountry[];
};

const fallbackResponse: TGetCountriesReturn = {
  defaultCountry: {},
  countries: [],
};

export const getCountries = async (): Promise<TGetCountriesReturn> => {
  try {
    const res = await nextFetch<TResponse<TCountriesData>>(
      "v1/auth/country-list",
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return {
      countries: Array.isArray(res?.data?.data)
        ? res?.data?.data
        : fallbackResponse.countries,
      defaultCountry: res?.data?.default || fallbackResponse.defaultCountry,
    };
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/country-list' ~ error:", error);
    return fallbackResponse;
  }
};
