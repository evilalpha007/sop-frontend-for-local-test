import { getDubaiBlogList } from "@/api/get-dubai-blog-list";
import DubaiBlogCard from "../SmallBlogCard/DubaiBlogCard";

interface IDubaiAllBlogListProps {
  apiQuery?: { country?: string };
  country?: string;
}

const DubaiAllBlogList = async ({
  apiQuery,
  country,
}: IDubaiAllBlogListProps) => {
  const { guideListData } = await getDubaiBlogList(apiQuery);

  // console.log("guideListDataQuery", apiQuery);

  return (
    <div>
      <div className="grid h-full gap-[18px] md:grid-cols-2 lg:grid-cols-3">
        {guideListData?.map((guide, index) => (
          <DubaiBlogCard
            key={index}
            title={guide?.title}
            description={guide?.description || "No description available"}
            alt={guide?.title}
            author_name={guide?.author_name || "N/A"}
            date={guide?.published_date}
            image={guide?.feature_image}
            slug={guide?.slug}
            country={country}
          />
        ))}
      </div>
    </div>
  );
};

export default DubaiAllBlogList;
