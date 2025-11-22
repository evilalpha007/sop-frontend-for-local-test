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
  count: number | null | undefined;
  pagination(arg0: string, pagination: any): unknown;
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
    count: undefined,
    pagination: function (arg0: string, pagination: any): unknown {
      throw new Error("Function not implemented.");
    }
  },
  areas: [],
};

export type TGetPropertyListArgs = {
  category(arg0: string, category: any): unknown;
  type(arg0: string, type: any): unknown;
  city(arg0: string, city: any): unknown;
  search(arg0: string, search: any): unknown;
  property_status?: number;
  bedrooms?: number;
  min_size?: number;
  max_size?: number;
  min_price?: number;
  max_price?: number;
  per_page?: number;
  country?: string;
  property_type?: number;
  is_front_section?: number;
  community_id?: number;
} | void;

export const getPropertyList = async (
  props: TGetPropertyListArgs,
): Promise<TPropertyListData> => {
  try {
    const { queryString } = generateQueryString(props);
    const res = await nextFetch<TResponse<TPropertyListData>>(
      `v1/auth/properties/filter${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    return {
      areas: Array.isArray(res?.data?.areas) ? res?.data?.areas : [],
      properties: {
        current_page: res?.data?.properties?.current_page,
        data: Array.isArray(res?.data?.properties?.data)
          ? res?.data?.properties?.data
          : [],
        first_page_url: res?.data?.properties?.first_page_url,
        from: res?.data?.properties?.from,
        last_page: res?.data?.properties?.last_page,
        last_page_url: res?.data?.properties?.last_page_url,
        links: Array.isArray(res?.data?.properties?.links)
          ? res?.data?.properties?.links
          : [],
        next_page_url: res?.data?.properties?.next_page_url,
        path: res?.data?.properties?.path,
        per_page: res?.data?.properties?.per_page,
        prev_page_url: res?.data?.properties?.prev_page_url,
        to: res?.data?.properties?.to,
        total: res?.data?.properties?.total,
        count: undefined,
        pagination: function (arg0: string, pagination: any): unknown {
          throw new Error("Function not implemented.");
        }
      },
    };
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/properties/filter' ~ error:", error);
    return fallbackResponse;
  }
};
