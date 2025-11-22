import {
  getPropertyTypes,
  TGetPropertyTypesArgs,
} from "@/api/get-property-types";
import Section from "@/components/blocks/Section/index";
import BreadCrumb from "@/features/BreadCrumb";
import ExpertPropertyContactCard from "@/features/ExpertPropertyContactCard";
import ProductsFilter from "@/features/ProductsFilter";
import PropertyList from "@/features/Properties/PropertyList";
import Reviews from "@/features/Reviews";
import VerticalAd from "@/features/VerticalAd";

const breadcrumbData = [
  { title: "Home", link: "/" },
  { title: "Properties", link: "/properties" },
];

export interface IProductPageProps {
  params: {
    country: string;
  };
}

const ProductsPage = async ({ params }: IProductPageProps) => {
  const propertyTypes = await getPropertyTypes(
    params.country as TGetPropertyTypesArgs,
  );

  const propertyType = propertyTypes.map((type) => ({
    label: type.name || "",
    value: type.id?.toString() ?? "",
  }));
  return (
    <Section>
      <Section.HeroContainer>
        <Section.Container className="max-w-[1224px]">
          <BreadCrumb data={breadcrumbData} className="mb-[50px]" />
        </Section.Container>
      </Section.HeroContainer>

      <Section.Container className="max-w-[1224px]">
        <div className="w-full">
          <ProductsFilter propertyType={propertyType} />
        </div>

        <div>
          <div className="grid gap-x-5 gap-y-[26px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <PropertyList fragmentOnly />
            <ExpertPropertyContactCard country={params.country} />
            <PropertyList fragmentOnly />
            <div className="row-span-2">
              <VerticalAd
                containerClassName="h-full"
                className="object-cover"
                imageClassName="!object-cover"
              />
            </div>
            <ExpertPropertyContactCard country={params.country} />
            <PropertyList fragmentOnly />

            <PropertyList fragmentOnly />
            <ExpertPropertyContactCard country={params.country} />
          </div>
        </div>
      </Section.Container>

      <Reviews
        className="mt-[84px]"
        apiQuery={{
          country: params?.country,
        }}
      />
    </Section>
  );
};

export default ProductsPage;
