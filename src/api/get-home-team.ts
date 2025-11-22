"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TSpecialized = {
  id?: number;
  name?: string;
};

export type TPivot = {
  our_team_id?: number;
  team_language_id?: number;
};

export type TLanguage = {
  id?: number;
  name?: string;
  pivot?: TPivot;
};

export type THomeTeam = {
  id?: number;
  full_name?: string;
  position?: string;
  experience?: string;
  slug?: string;
  image?: string;
  alt_text?: string;
  specialized_id?: number;
  specialized?: TSpecialized;
  languages?: TLanguage[];
};

export type THomeTeamData = THomeTeam[];

const fallbackResponse: THomeTeamData = [];

type TGetHomeTeamArgs = {
  country?: string;
  language?: string | number;
  specialized?: string | number;
} | void;

export const getHomeTeam = async (
  props: TGetHomeTeamArgs,
): Promise<THomeTeamData> => {
  try {
    const { queryString } = generateQueryString(props);
    const res = await nextFetch<TResponse<THomeTeamData>>(
      `v1/auth/our-teams/all-data${queryString}`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return Array.isArray(res?.data) ? res?.data : fallbackResponse;
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/our-teams/all-data' ~ error:", error);
    return fallbackResponse;
  }
};
