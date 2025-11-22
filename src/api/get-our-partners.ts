"use server";
import env from "@/config/env";
import { generateQueryString } from "@/library/utils/generate-query-string";
import { getGroupedItems } from "@/library/utils/get-grouped-items";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TGetOurPartnersProps =
  | {
      country?: string;
    }
  | null
  | undefined
  | void;

export type TPartner = {
  id: number;
  alt_text?: string;
  image: string;
};

export type TPartnersData = TPartner[];
const fallbackApiRes: TPartnersData = [];

export type TSlideGroupArr = TPartnersData[];

export type TPartnerSlideData = {
  mobile?: TSlideGroupArr;
  desktop?: TSlideGroupArr;
};

const partnerSlideDataFallback: TPartnerSlideData = {
  mobile: [],
  desktop: [],
};

export const getOurPartners = async (
  args: TGetOurPartnersProps,
): Promise<TPartnerSlideData> => {
  try {
    const { queryString } = generateQueryString(args);
    const res = await nextFetch<TResponse<TPartnersData>>(
      `v1/auth/our-partners${queryString}`,
      {
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );

    const ourPartnersData = Array.isArray(res?.data)
      ? res?.data
      : fallbackApiRes;

    const mobileSlideData: TSlideGroupArr = await getGroupedItems({
      items: ourPartnersData,
      groupSize: 6,
    });

    const desktopSlideData: TSlideGroupArr = await getGroupedItems({
      items: ourPartnersData,
      groupSize: 8,
    });

    return {
      mobile: mobileSlideData || partnerSlideDataFallback?.mobile,
      desktop: desktopSlideData || partnerSlideDataFallback?.desktop,
    };
  } catch (error) {
    console.error("🚀 ~ getOurPartners ~ error", error);
    return partnerSlideDataFallback;
  }
};
