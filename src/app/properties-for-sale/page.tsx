import { getPropertyTypes } from "@/api/get-property-types";
import Section from "@/components/blocks/Section/index";
import BreadCrumb from "@/features/BreadCrumb";
import ExpertPropertyContactCard from "@/features/ExpertPropertyContactCard";
import ProductsFilter from "@/features/ProductsFilter";
import PropertyList from "@/features/Properties/PropertyList";
import Reviews from "@/features/Reviews";
import VerticalAd from "@/features/VerticalAd";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";
import { cookies } from "next/headers";

const breadcrumbData = [
  { title: "Home", link: "/" },
  { title: "Properties", link: "/properties" },
];

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/properties",
  });

  const seoData = data[0];

  return {
    title: seoData?.title,
    description: seoData?.description,
    keywords: seoData?.keywords,
    openGraph: {
      title: seoData?.title,
      description: seoData?.description,
      url: seoData?.route,
      type: "website",
    },
  };
}

const ProductsPage = async ({ searchParams }: any) => {
  const propertyTypes = await getPropertyTypes();
  console.log(propertyTypes, searchParams, "======");
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/properties",
  });

  const scripts = await JSON.parse(data[0]?.scripts || "[]");

  const propertyTypeList = propertyTypes.map((type) => ({
    label: type.name || "",
    value: type.id?.toString() ?? "",
  }));

  const country = "uae";

  const apiQuery = {
    // Required functions to satisfy TGetPropertyListArgs
    category: (_arg0: string, category: any) => category,
    type: (_arg0: string, type: any) => type,
    city: (_arg0: string, city: any) => city,
    search: (_arg0: string, search: any) => search,

    country,
    is_front_section: searchParams?.is_front_section || 7, // Default 7 for BUY, but tabs can override
    ...(searchParams?.propertyType !== null &&
      searchParams?.propertyType != 0 &&
      searchParams?.propertyType != "" && {
        property_type: searchParams?.propertyType,
      }),
    ...(searchParams?.bedrooms !== null &&
      searchParams?.bedrooms != 0 &&
      searchParams?.bedrooms != "" && {
        bedrooms: searchParams?.bedrooms,
      }),
    ...(searchParams?.min_price !== null &&
      searchParams?.min_price != 0 &&
      searchParams?.min_price != "" &&
      searchParams?.max_price !== null &&
      searchParams?.max_price != 0 &&
      searchParams?.max_price != "" && {
        min_price: searchParams?.min_price,
        max_price: searchParams?.max_price,
      }),
    ...(searchParams?.min_size !== null &&
      searchParams?.min_size != 0 &&
      searchParams?.min_size != "" &&
      searchParams?.max_size !== null &&
      searchParams?.max_size != 0 &&
      searchParams?.max_size != "" && {
        min_size: searchParams?.min_size,
        max_size: searchParams?.max_size,
      }),
    from_currency: searchParams?.from_currency ?? "AED",
    per_page: 100,
  };

  // console.log("🔍 API Query is_front_section:", apiQuery.is_front_section);
 

  return (
    <Section>
      <Section.HeroContainer>
        <Section.Container className="max-w-[1224px]">
          <BreadCrumb data={breadcrumbData} className="mb-[50px]" />
        </Section.Container>
      </Section.HeroContainer>

      <Section.Container className="max-w-[1224px]">
        <div className="w-full">
          <ProductsFilter
            propertyType={[
              { value: "", label: "Show All" },
              ...propertyTypeList,
            ]}
            selectedPropertyType={searchParams?.propertyType}
            selectedBedrooms={searchParams?.bedrooms}
            selectedMinPrice={searchParams?.min_price}
            selectedMaxPrice={searchParams?.max_price}
            selectedIsFrontSection={searchParams?.is_front_section}
            selectedMinSize={searchParams?.min_size}
            selectedMaxSize={searchParams?.max_size}
            from_currency={searchParams?.from_currency ?? "AED"}
          />
        </div>

        <div>
          <div className="grid gap-x-5 gap-y-[26px] sm:grid-cols-2 md:grid-cols-3">
            <PropertyList fragmentOnly apiQuery={apiQuery} />
            {/* <ExpertPropertyContactCard />
            <PropertyList fragmentOnly apiQuery={apiQuery} />
            <div className="row-span-2">
              <VerticalAd
                containerClassName="h-full"
                className="object-cover"
                imageClassName="!object-cover"
              />
            </div>
            <ExpertPropertyContactCard />
            <PropertyList fragmentOnly apiQuery={apiQuery} />
            <PropertyList fragmentOnly apiQuery={apiQuery} />
            <ExpertPropertyContactCard /> */}
          </div>
        </div>
      </Section.Container>

      <Reviews className="mt-[84px]" />

      {scripts.map((script: any, index: number) => (
        <script
          key={index}
          dangerouslySetInnerHTML={{ __html: script }} // Inject the JavaScript code
        />
      ))}
    </Section>
  );
};

export default ProductsPage;
