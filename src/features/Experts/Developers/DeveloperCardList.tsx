import { getOurDevelopers } from "@/api/get-our-developers";
import { cn } from "@/library/utils/cn";
import DeveloperCard from "./DeveloperCard";

interface IDeveloperCardListProps {
  className?: string;
  apiQuery?: {
    country?: string;
  };
  country?: string;
}

const DeveloperCardList = async ({
  className,
  apiQuery,
  country = "",
}: IDeveloperCardListProps) => {
  const developersData = await getOurDevelopers(apiQuery);
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {developersData?.map((developer) => (
        <DeveloperCard
          key={developer.id}
          id={developer.id ?? -1}
          image={developer.image}
          alt={developer.name}
          name={developer.name}
          slug={developer.slug}
          country={country}
        />
      ))}
    </div>
  );
};

export default DeveloperCardList;
