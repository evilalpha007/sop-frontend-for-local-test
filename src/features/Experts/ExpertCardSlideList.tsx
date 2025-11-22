import { cn } from "@/library/utils/cn";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import ExpertCard from "./ExpertCard";
import { TExpertsSlideData } from "./ExpertsSlide/MobileSlider";

interface IExpertCardSlideListProps {
  // limit?: number;
  className?: string;
  index: number;
  type?: "Mobile" | "Tablet" | "Desktop";
}

const ExpertCardSlideList = async ({
  className,
  index,
  type,
}: IExpertCardSlideListProps) => {
  const limit = type === "Desktop" ? 3 : type === "Tablet" ? 2 : 1;
  const res = await nextFetch<TResponse<TExpertsSlideData>>(
    `v1/auth/our-teams/filter?limit=${limit}&page=${index + 1}`,
    {
      cache: "no-store",
    },
  );
  const ourExpertsData = res?.data;
  // if ((limit || 0) > 0) {
  //   return (
  //     <div
  //       className={cn(
  //         "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
  //         {
  //           "grid-cols-1": limit === 1,
  //           "grid-cols-2": limit === 2,
  //           "grid-cols-3": limit === 3,
  //         },
  //         className,
  //       )}
  //     >
  //       {data.slice(0, limit).map((expert) => (
  //         <ExpertCard key={expert.id} {...expert} />
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {ourExpertsData?.data?.map((expert) => (
        <ExpertCard
          key={expert.id}
          id={expert.id}
          alt={expert.alt_text}
          designation={expert.specialized.name}
          experience={expert.experience}
          image={expert.image}
          languages={expert.languages
            ?.map((language) => language?.name)
            ?.join(", ")}
          name={expert.full_name}
        />
      ))}
    </div>
  );
};

export default ExpertCardSlideList;
