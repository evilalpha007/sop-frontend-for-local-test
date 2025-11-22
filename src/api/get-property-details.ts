"use server";
import env from "@/config/env";
import { TListRowProps } from "@/features/ArrowListTable/ListRow";
import { generateBlurDataUrl } from "@/library/utils/image";
import makeAsyncTask from "@/library/utils/make-async-task";

import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

export type TGalleryImage = {
  id: number;
  foreign_id: number;
  path: string;
};

export type TDldSection = {
  is_dld_section: boolean;
  dld_title: string;
  dld_description: any;
  dld_qr_code: string;
  dld_qr_number: string;
  location_map_url: string;
};

export type TFaqSection = {
  is_faq_section: boolean;
  faq_title: string | null | undefined;
  faq_description: string | null | undefined;
  faq_limit: number;
  faq_data: TFaqData[];
};

export type TListingDetail = {
  title: string;
  value: string;
};

export interface ListingDetailsSection {
  is_listing_section: boolean;
  listing_details: TListingDetail[];
}

export type TPlanData = {
  id: number;
  plan_category_id: number;
  property_id: number;
  plan_category: string;
  images: string[];
};

export interface PlanSection {
  is_plan_section: boolean;
  plan_data: TPlanData[];
}

export type TFloorType = {
  title: string;
};

export type TFloorSize = {
  title: string;
};

export type TFloorPrice = {
  title: string;
};

export type FloorPlanDetailsSection = {
  is_floor_plan_details_section: boolean;
  floor_plan_title: string | null | undefined;
  floor_plan_subtitle: string | null | undefined;
  floor_type: TFloorType[];
  floor_size: TFloorSize[];
  floor_price: TFloorPrice[];
};

export interface FeatureAminitiesSection {
  floor_plan_title: string | null | undefined;
  feature_aminities: FeatureAminity[];
}

export interface FeatureAminity {
  id: number;
  title: string;
  icon: any;
}

export type THighlight = {
  title: string;
};

export interface HighlightsSection {
  is_highlights_section: boolean;
  highlight_title: string;
  highlight_description: string;
  highlights: THighlight[];
}

export type TLocationLeftData = {
  title: string;
};

export interface LocationSection {
  is_location_section: boolean;
  location_section_title: string;
  location_section_subtitle: string;
  location_map_url: string;
  location_section_slogan: string;
  location_left_data: TLocationLeftData[];
}

export interface VideoSection {
  is_video_section: boolean;
  video_title: string;
  video_description: string;
  video_button_text: string;
  video_button_link: string;
}

export interface ContactFormSection {
  is_contact_form_section: boolean;
  property_contact_member_name: string;
  property_contact_member_specialized: string;
  property_contact_member_experience: string;
  property_contact_member_language: any;
}

export type TDeveloperSliderImage = {
  id: number;
  foreign_id: number;
  path: string;
};

export interface DeveloperSection {
  is_developer_section: boolean;
  developer_section_title: string;
  developer_section_description: string | null | undefined;
  developer_slider_images: TDeveloperSliderImage[];
}

export type TFaqData = {
  answer: string;
  question: string;
};

export type TPropertyDetailsData = {
  id: number;
  title: string;
  feature_image: string;
  gallery_images: TGalleryImage[];
  slug: string;
  price: string;
  size: string;
  bedrooms: number;
  washrooms: number;
  address: string;
  builder_logo: string;
  description: string;
  listing_details_section: ListingDetailsSection;
  plan_section: PlanSection;
  floor_plan_details_section: FloorPlanDetailsSection;
  feature_aminities_section: FeatureAminitiesSection;
  highlights_section: HighlightsSection;
  location_section: LocationSection;
  dld_section: TDldSection;
  video_section: VideoSection;
  contact_form_section: ContactFormSection;
  developer_section: DeveloperSection;
  faq_section: TFaqSection;
};

type TSliderImage = {
  id: number;
  image: string;
  blurDataUrl: string;
};

export type TPropertyDetailsReturnType = Omit<
  TPropertyDetailsData,
  | "listing_details_section"
  | "floor_plan_details_section"
  | "feature_aminities_section"
  | "highlights_section"
  | "gallery_images"
> & {
  // data: TPropertyDetailsData;
  propertyData: any;
  listingDetailsData: {
    shouldVisible: boolean;
    listingDataPart1: TListRowProps[];
    listingDataPart2: TListRowProps[];
  };
  floorPlanDetailsData: {
    shouldVisible: boolean;
    floorPlanTitle: string | null | undefined;
    floorPlanSubtitle: string | null | undefined;
    propertyTypeTable: TListRowProps[];
    sizeTable: TListRowProps[];
    priceTable: TListRowProps[];
  };
  featureAmenitiesSectionData: {
    featureAmenitiesSectionTitle: string | null | undefined;
    part1Data: TListRowProps[];
    part2Data: TListRowProps[];
    part3Data: TListRowProps[];
  };
  highlightsSectionData: {
    shouldVisible: boolean;
    highlightsTable1: TListRowProps[];
    highlightsTable2: TListRowProps[];
    highlightTitle: string;
    highlightDescription: string;
  };

  propertySliderImages: TSliderImage[];
};

export type TGetPropertyDetailsArgs = {
  property_status?: number;
  bedrooms?: number;
  min_size?: number;
  max_size?: number;
  min_price?: number;
  max_price?: number;
  per_page?: number;
  property_type?: number;
  is_front_section?: number;
  community_id?: number;
  country?: string;
  slug?: string;
} | void;

export const getPropertyDetails = async (props: any): Promise<any> => {
  try {
    // const { queryString } = generateQueryString(props);
    const res = await nextFetch<TResponse<TPropertyDetailsData>>(
      `v1/auth/properties/${props?.slug}`,
      {
        // cache: "no-store",
        next: {
          revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
        },
      },
    );
    // console.log("🚀 ~ home team res:", res);

    const propertyData = res?.data;

    const data: TPropertyDetailsData = (res?.data ??
      {}) as TPropertyDetailsData;

    const listingDetailsData = makeAsyncTask(() => {
      const listingDataPart1: TListRowProps[] = [];
      const listingDataPart2: TListRowProps[] = [];
      const { listing_details_section } = data;

      for (
        let i = 0;
        i < (listing_details_section?.listing_details?.length ?? 0);
        i++
      ) {
        const { title, value } = listing_details_section?.listing_details[i];
        if (i % 2 === 0) {
          listingDataPart1.push({
            id: crypto.randomUUID(),
            title,
            description: value,
            descriptionAs: "text",
          });
        } else {
          listingDataPart2.push({
            id: crypto.randomUUID(),
            title,
            description: value,
            descriptionAs: "text",
          });
        }
      }

      return {
        shouldVisible: listing_details_section?.is_listing_section ?? false,
        listingDataPart1,
        listingDataPart2,
      };
    });

    const floorPlanDetailsData = makeAsyncTask(() => {
      const propertyTypeTable: TListRowProps[] = [];
      const sizeTable: TListRowProps[] = [];
      const priceTable: TListRowProps[] = [];
      const {
        floor_type,
        floor_size,
        floor_price,
        is_floor_plan_details_section,
        floor_plan_title,
        floor_plan_subtitle,
      } = data?.floor_plan_details_section;

      for (let index = 0; index < (floor_type?.length ?? 0); index++) {
        const element = floor_type[index];
        propertyTypeTable.push({
          id: crypto.randomUUID(),
          title: element?.title || "",
        });
      }

      for (let index = 0; index < (floor_size?.length ?? 0); index++) {
        const element = floor_size[index];
        sizeTable.push({
          id: crypto.randomUUID(),
          title: element?.title || "",
        });
      }

      for (let index = 0; index < (floor_price?.length ?? 0); index++) {
        const element = floor_price[index];
        priceTable.push({
          id: crypto.randomUUID(),
          title: element?.title || "",
        });
      }

      return {
        shouldVisible: !!is_floor_plan_details_section,
        floorPlanTitle: floor_plan_title,
        floorPlanSubtitle: floor_plan_subtitle,
        propertyTypeTable,
        sizeTable,
        priceTable,
      };
    });

    const featureAmenitiesSection = makeAsyncTask(() => {
      const part1Data: TListRowProps[] = [];
      const part2Data: TListRowProps[] = [];
      const part3Data: TListRowProps[] = [];
      const { feature_aminities, floor_plan_title } =
        data?.feature_aminities_section;

      for (let i = 0; i < (feature_aminities?.length ?? 0); i++) {
        const { title, icon } = feature_aminities[i];
        if (i % 3 === 0) {
          part1Data.push({
            id: crypto.randomUUID(),
            title,
            iconImageSrc: icon,
          });
        } else if (i % 3 === 1) {
          part2Data.push({
            id: crypto.randomUUID(),
            title,
            iconImageSrc: icon,
          });
        } else if (i % 3 === 2) {
          part3Data.push({
            id: crypto.randomUUID(),
            title,
            iconImageSrc: icon,
          });
        }
      }

      return {
        res,
        featureAmenitiesSectionTitle: floor_plan_title,
        part1Data,
        part2Data,
        part3Data,
      };
    });

    const highlightsSectionData = makeAsyncTask(() => {
      const highlightsTable1: TListRowProps[] = [];
      const highlightsTable2: TListRowProps[] = [];
      const {
        highlights,
        is_highlights_section,
        highlight_title,
        highlight_description,
      } = data?.highlights_section;

      for (let i = 0; i < (highlights?.length ?? 0); i++) {
        const { title } = highlights[i];
        if (i % 2 === 0) {
          highlightsTable2.push({
            id: crypto.randomUUID(),
            title,
          });
        } else {
          highlightsTable1.push({
            id: crypto.randomUUID(),
            title,
          });
        }
      }

      return {
        shouldVisible: !!is_highlights_section,
        highlightsTable1,
        highlightsTable2,
        highlightTitle: highlight_title,
        highlightDescription: highlight_description,
      };
    });

    const propertySliderImages = makeAsyncTask(() => {
      const { gallery_images } = data;
      const processSliderImages = async () => {
        const images: {
          id: number;
          image: string;
          blurDataUrl: string;
        }[] = [];
        for (let i = 0; i < (gallery_images?.length ?? 0); i++) {
          const { path, id } = gallery_images?.[i];
          const blurDataUrl = await generateBlurDataUrl(path);

          images.push({
            id,
            image: path,
            blurDataUrl,
          });
        }

        return images;
      };

      return processSliderImages();
    });

    const {
      listing_details_section,
      floor_plan_details_section,
      feature_aminities_section,
      highlights_section,
      gallery_images,
      ...restData
    } = data;

    return {
      ...restData,
      propertyData: propertyData,
      listingDetailsData: await listingDetailsData,
      floorPlanDetailsData: await floorPlanDetailsData,
      featureAmenitiesSectionData: await featureAmenitiesSection,
      highlightsSectionData: await highlightsSectionData,
      propertySliderImages: await propertySliderImages,
    };
  } catch (error) {
    console.error("🚀 ~ 'v1/auth/properties/slug' ~ error:", error);
    return {} as TPropertyDetailsReturnType;
  }
};
