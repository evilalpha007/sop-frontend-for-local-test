import { TExpert } from "@/api/get-team-experts";
import { cn } from "@/library/utils/cn";
import ExpertCard from "./ExpertCard";

interface IExpertCardListProps {
  data: TExpert[] | null | undefined;
  className?: string;
}

const ExpertCardList = async ({
  className = "",
  data,
}: IExpertCardListProps) => {
  // const { data, paginationInfo } = await getTeamExperts(apiQuery);

  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        // {
        //   "grid-cols-1": limit === 1,
        //   "grid-cols-2": limit === 2,
        //   "grid-cols-3": limit === 3,
        // },
        className,
      )}
    >
      {data?.map((expert) => (
        <ExpertCard
          key={expert.id}
          id={expert.id ?? -1}
          image={expert.image}
          slug={expert.slug}
          alt={expert.alt_text}
          name={expert.full_name}
          designation={expert.position}
          experience={expert.experience}
          languages={expert?.languages?.map((lang) => lang.name).join(", ")}
        />
      ))}
    </div>
  );
};

export default ExpertCardList;
