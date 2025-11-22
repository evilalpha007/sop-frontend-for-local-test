"use server";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { generateBlurDataUrl } from "@/library/utils/image";
import makeAsyncTask from "@/library/utils/make-async-task";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

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

type TExpertsData = TExpert[];

const fallbackData: TExpertsData = [];

export type TTeamExpert = TExpert & { blurDataUrl: string };
export type TTeamExperts = TTeamExpert[];
const fallbackTeamExperts: TTeamExperts = [];

const processTeamExperts = async (
  data: TExpertsData,
): Promise<TTeamExperts> => {
  const processedData: TTeamExperts = [];
  if (!Array.isArray(data) || !data?.length) return fallbackTeamExperts;

  for (let index = 0; index < data.length; index++) {
    const team = data?.[index];
    const blurDataUrl = await generateBlurDataUrl(team.image);
    processedData.push({ ...team, blurDataUrl });
  }

  return processedData;
};

type TGetTeamExpertsProps =
  | {
      country?: string;
      language?: string | number;
      specialized?: string | number;
    }
  | null
  | undefined
  | void;

export const getAllTeamExperts = async (
  props: TGetTeamExpertsProps,
): Promise<TTeamExperts> => {
  try {
    const { queryString } = generateQueryString(props);
    const res = await nextFetch<TResponse<TExpertsData>>(
      `v1/auth/our-teams/filter${queryString}`,
    );

    return await makeAsyncTask(() =>
      processTeamExperts(Array.isArray(res?.data) ? res.data : []),
    );
  } catch (error) {
    console.error("🚀 ~ getAllTeamExperts ~ error", error);
    return fallbackTeamExperts;
  }
};
