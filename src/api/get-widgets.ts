import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import { TLanguage, TSpecialized } from "./get-all-team-expert";
import env from "@/config/env";

export const getWidgets = async (country = "ae") => {
  try {
    const res = (await nextFetch(`v1/auth/widget?country=${country}`, {
      // cache: "no-store",
      next: {
        revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
      },
    })) as any;

    return res?.data || [];
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/our-teams/[id]' ~ error:", error);
    return [];
  }
};
