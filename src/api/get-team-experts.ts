"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TMeta, TPaginationResponse } from "@/types/common";

export type TSpecialized = {
  id: number;
  name: string;
};

export type TPivot = {
  our_team_id: number;
  team_language_id: number;
};

export type TLanguage = {
  id: number;
  name: string;
  pivot: TPivot;
};

export type TExpert = {
  id?: number;
  full_name?: string;
  slug?: string;
  position?: string;
  experience?: string;
  image?: string;
  alt_text?: string;
  specialized_id?: number;
  specialized?: TSpecialized;
  languages?: TLanguage[] | null | undefined;
};

type TFallback = {
  data: TExpert[];
  paginationInfo: NonNullable<Required<TMeta>>;
};

const fallbackData: TFallback = {
  data: [],
  paginationInfo: {
    current_page: 1,
    per_page: 8,
    from: 1,
    last_page: 1,
    to: 1,
    total: 0,
  },
};

type TGetTeamExpertsProps =
  | {
      country?: string;
      language?: string | number;
      specialized?: string | number;
      limit?: number;
      page?: number;
    }
  | null
  | undefined
  | void;

export const getTeamExperts = async (
  props: TGetTeamExpertsProps,
): Promise<TFallback> => {
  try {
    const { queryString } = generateQueryString({
      ...(props ?? {}),
      limit: props?.limit || 16,
      page: props?.page || 1,
    });
    const res = await nextFetch<TPaginationResponse<TExpert[]>>(
      `v1/auth/our-teams/filter${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return {
      data: Array.isArray(res?.data?.data) ? res?.data?.data : [],
      paginationInfo: {
        from: res?.data?.from || 1,
        last_page: res?.data?.last_page || 1,
        to: res?.data?.to || 1,
        total: res?.data?.total || 0,
        per_page: res?.data?.per_page || 8,
        current_page: res?.data?.current_page || 1,
      },
    };
  } catch (error) {
    console.error("🚀 ~ getTeamExperts ~ error", error);
    return fallbackData;
  }
};
