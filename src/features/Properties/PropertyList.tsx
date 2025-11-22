import { getPropertyList, TGetPropertyListArgs } from "@/api/get-property-list";
import { cn } from "@/library/utils/cn";
import PropertyCard from "./PropertyCard";

const getCurrency = (country: string | null | undefined) => {
  switch (country) {
    case "uae":
      return "AED";
    case "ca":
      return "CAD";
    case "in":
      return "INR";
    default:
      return "AED";
  }
};

interface IPropertyListProps {
  // limit?: number;
  apiQuery?: TGetPropertyListArgs;
  className?: string;
  fragmentOnly?: boolean;
}

const PropertyList = async ({
  apiQuery,
  className,
  fragmentOnly,
}: IPropertyListProps) => {
  const { properties } = await getPropertyList(apiQuery);
  const { data } = properties;
  const content = (
    <>
      {data?.map((property) => (
        <PropertyCard
          key={property.id}
          // {...property}
          id={property.id ?? -1}
          alt={property.title ?? ""}
          title={property?.title}
          image={property.image ?? ""}
          price={property.price ?? ""}
          currency={getCurrency(apiQuery?.country)}
          location={property.address ?? ""}
          discount={property.discount ?? ""}
          bed={property.bedrooms ?? 0}
          bath={property.washrooms ?? 0}
          area={property.size ?? ""}
          areaUnit={""}
          phone={property.phone ?? ""}
          email={property.email ?? ""}
          slug={property.slug ?? ""}
          country={apiQuery?.country}
          is_front_section={apiQuery?.is_front_section ?? null}
        />
      ))}

      {!data?.length && (
        <div className="col-span-full mb-10 text-center">
          <p className="text-theme-light-golden">
            Currently, there are no properties listed in this category.
            We&apos;re constantly updating our listings, so please check back
            soon! If you&apos;re looking for something specific, feel free to
            contact us or explore other categories.
          </p>
        </div>
      )}
    </>
  );

  if (fragmentOnly) {
    return content;
  }

  return (
    <div
      className={cn(
        "grid gap-x-5 gap-y-[26px] sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {content}
    </div>
  );
};

export default PropertyList;
