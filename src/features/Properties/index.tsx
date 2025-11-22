import {} from "@/api/get-property-list";
import Section from "@/components/blocks/Section/index";
import Button from "@/components/elements/buttons/Button";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import Header from "./Header";
import PropertyList from "./PropertyList";

interface IPropertiesProps {
  className?: string;
  title?: string;
  // country?: string;
  // propertyType?: number;
  apiQuery?: any;
}

const Properties = async ({
  className,
  title,
  apiQuery,
  // country,
  // propertyType,
}: IPropertiesProps) => {
  return (
    console.log("apiQuery2", apiQuery),
    (
      <Section.Container className={className}>
        <Header
          country={apiQuery?.country}
          title={title}
          propertyType={apiQuery?.property_type}
          bedrooms={apiQuery?.bedrooms}
          min_price={apiQuery?.min_price}
          max_price={apiQuery?.max_price}
        />

        <PropertyList apiQuery={apiQuery} />

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
      </Section.Container>
    )
  );
};

export default Properties;
