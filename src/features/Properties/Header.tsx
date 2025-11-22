import { getPropertyTypes } from "@/api/get-property-types";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Filters from "./Filters";



interface IHeaderProps {
  className?: string;
  title?: string;
  country?: string;
  propertyType?: string | number;
  bedrooms?: string | number;
  min_price?: string | number;
  max_price?: string | number;
}

const Header = async ({
  title = "LUXURY PROPERTIES (OFF PLAN)",
  className,
  country,
  bedrooms,
  min_price,
  max_price,
  // activeTab,
  propertyType,
}: IHeaderProps) => {
  const getPropertyTypesData = await getPropertyTypes({ country: country });


  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      <Typography as="h2" className="mb-2.5 text-theme-light-golden sm:mb-4">
        {title}
      </Typography>

      <Filters data={getPropertyTypesData} propertyType={propertyType} />
    </div>
  );
};

export default Header;
