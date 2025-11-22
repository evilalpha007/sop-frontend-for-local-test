"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";

import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TArea = {
  area_id: number | null | undefined;
  name: string | null | undefined;
  count: number | null | undefined;
};

export type TLink = {
  url?: string | null | undefined;
  label: string | null | undefined;
  active: boolean;
};

export type TPropertyData = {
  id: number | null | undefined;
  title: string | null | undefined;
  slug: string | null | undefined;
  price: string | null | undefined;
  size: string | null | undefined;
  bedrooms: number | null | undefined;
  washrooms: number | null | undefined;
  image: string | null | undefined;
  address: string | null | undefined;
  discount: string | null | undefined | null | undefined;
  phone: string | null | undefined | null | undefined;
  email: string | null | undefined | null | undefined;
};

export type TProperties = {
  current_page: number | null | undefined;
  data: TPropertyData[] | null | undefined;
  first_page_url: string | null | undefined;
  from: number | null | undefined;
  last_page: number | null | undefined;
  last_page_url: string | null | undefined;
  links: TLink[] | null | undefined;
  next_page_url: string | null | undefined | null | undefined;
  path: string | null | undefined;
  per_page: number | null | undefined;
  prev_page_url: string | null | undefined | null | undefined;
  to: number | null | undefined;
  total: number | null | undefined;
};

export interface TPropertyListData {
  properties: TProperties;
  areas: TArea[] | null | undefined;
}

type TPropertyListReturnType = {
  properties: TProperties;
  areas: TArea[];
};

const fallbackResponse: TPropertyListReturnType = {
  properties: {
    current_page: 1,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 1,
    last_page_url: "",
    links: [],
    next_page_url: "",
    path: "",
    per_page: 10,
    prev_page_url: "",
    to: 0,
    total: 0,
  },
  areas: [],
};

export type TGetPropertyListArgs = {
  city_id?: number | null | undefined;
  type_id?: number | null | undefined;
  country?: string;
} | void;

export const getSimilarPropertyList = async (
  props: TGetPropertyListArgs,
): Promise<any> => {
  try {
    const { queryString } = generateQueryString(props);
    const res = await nextFetch<TResponse<any>>(
      `v1/auth/properties/similar-property${queryString}&per_page=6`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    console.log(
      "🚀 ~ file: get-similar-property-list.ts ~ line 151 ~ getSimilarPropertyList ~ res",
      res,
    );

    return {
      properties: Array.isArray(res?.data) ? res?.data : [],
    };
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/properties/filter' ~ error:", error);
    return fallbackResponse;
  }
};
