import { Metadata } from "next";
import { nextFetch } from "./next-fetch";
import env from "@/config/env";

export const getSeoMeta = async ({ url }: { url: string }) => {
  const res = await nextFetch<any>(`v1/auth/seo-meta/?page_title=${url}`, {
    next: {
      revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
    },
  });
  console.log(
    "🚀 ~ file: get-seo-meta.ts ~ line 23 ~ getSeoMeta ~ res",
    res.data,
  );

  const data = res?.data;

  return data;
};
