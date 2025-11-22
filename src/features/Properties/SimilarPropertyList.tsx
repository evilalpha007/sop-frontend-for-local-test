import { getPropertyList, TGetPropertyListArgs } from "@/api/get-property-list";
import { cn } from "@/library/utils/cn";
import PropertyCard from "./PropertyCard";
import { getSimilarPropertyList } from "@/api/get-similar-property-list";
import Section from "@/components/blocks/Section";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import Button from "@/components/elements/buttons/Button";

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
  apiQuery?: any;
  className?: string;
  fragmentOnly?: boolean;
}

const SimilarPropertyList = async ({
  apiQuery,
  className,
  fragmentOnly,
}: IPropertyListProps) => {
  const { properties } = await getSimilarPropertyList(apiQuery);
  const content = (
    <div className="mx-auto max-w-[1097px]">
      <div className="mx-auto mb-[42px] w-full max-w-[551px]">
        <Typography
          as="h2"
          className="md-[10px] text-center text-sm font-medium uppercase text-theme-off-white sm:mb-4 md:mb-7 md:text-[32px]"
        >
          Similar Properties
        </Typography>
      </div>
      <div className="grid gap-x-5 gap-y-[26px] sm:grid-cols-2 lg:grid-cols-3">
        {properties?.map((property: any) => (
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
      </div>
      <div className="mt-7 flex items-center justify-center">
        <Button
          className="flex shrink-0 items-center justify-center gap-2 border-b border-theme-light-golden px-[11px] pb-[7px] sm:gap-4"
          asChild
        >
          <Link
            href={
              apiQuery?.country
                ? `/${apiQuery?.country}/properties`
                : "/properties"
            }
          >
            <Typography
              as="span"
              // selectPClassName="30020"
              className="text-xs sm:text-xl"
            >
              Show All
            </Typography>
          </Link>
        </Button>
      </div>

      {!properties?.length && (
        <div className="col-span-full mb-10 text-center">
          <p className="text-theme-light-golden">
            Currently, there are no properties listed in this category.
            We&apos;re constantly updating our listings, so please check back
            soon! If you&apos;re looking for something specific, feel free to
            contact us or explore other categories.
          </p>
        </div>
      )}
    </div>
  );

  if (fragmentOnly) {
    return content;
  }

  return <div className={cn("", className)}>{content}</div>;
};

export default SimilarPropertyList;
