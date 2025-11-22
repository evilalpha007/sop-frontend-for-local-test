"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

// Define the data structure for the "specialty"
export type TSpecialtyItem = {
  id: number;
  icon?: string;
  title?: string;
  description?: string;
};

export type TSpecialtyApiData = TSpecialtyItem[];

const fallbackResponse: TSpecialtyApiData = [];

type TGetSpecialtyArgs =
  | {
      country?: string;
    }
  | void
  | null
  | undefined;

export const getSpecialty = async (
  props: TGetSpecialtyArgs,
): Promise<TSpecialtyApiData> => {
  try {
    const { queryString } = generateQueryString(props);

    const res = await nextFetch<TResponse<TSpecialtyApiData>>(
      `v1/auth/speciality${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return Array.isArray(res?.data) ? res?.data : fallbackResponse;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/speciality' ~ error:", error);
    return fallbackResponse;
  }
};
