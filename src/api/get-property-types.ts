"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TPropertyType = {
  id?: number;
  name?: string;
};

// export type TCountryCode = TCountry["code"];

// export type TCountriesData = {
//   default: TCountry | null | undefined;
//   data: TCountry[] | null | undefined;
// };

export type TGetPropertyTypesReturn = TPropertyType[];

const fallbackResponse: TGetPropertyTypesReturn = [];

export type TGetPropertyTypesArgs =
  | {
      country?: string;
    }
  | void
  | null
  | undefined;

export const getPropertyTypes = async (
  props: TGetPropertyTypesArgs,
): Promise<TGetPropertyTypesReturn> => {
  try {
    const { queryString } = generateQueryString(props);
    console.log(
      "🚀 ~ file: get-property-types.ts ~ line 134 ~ getPropertyTypes ~ queryString",
      queryString,
      props,
    );
    const res = await nextFetch<TResponse<TPropertyType[]>>(
      `v1/auth/properties/property-types${queryString}`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return Array.isArray(res?.data) ? res?.data : fallbackResponse;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/properties/property-types' ~ error:", error);
    return fallbackResponse;
  }
};
