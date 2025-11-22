import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import { TLanguage, TSpecialized } from "./get-all-team-expert";
import env from "@/config/env";

export type TSingleMemberData = {
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

export const getSingleMember = async (slug: string) => {
  try {
    const res = await nextFetch<TResponse<TSingleMemberData>>(
      `v1/auth/our-teams/${slug}`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return res?.data || [];
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/our-teams/[id]' ~ error:", error);
    return [];
  }
};
