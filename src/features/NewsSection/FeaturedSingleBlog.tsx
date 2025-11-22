import { getFeaturedBlog } from "@/api/get-featured-blog";
import LargeBlogCard from "../LargeBlogCard";
import LargeImage from "../LargeBlogCard/LargeImage";

interface FeaturedSingleBlogProps {
  className?: string;
  disableTitleSubtitle?: boolean;
  apiQuery?: {
    country?: string;
  };
}

const FeaturedSingleBlog = async ({ apiQuery }: FeaturedSingleBlogProps) => {
  const { featured_post } = await getFeaturedBlog(apiQuery);

  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-5 md:flex-row">
        <LargeBlogCard className="order-2 w-full md:order-1 md:max-w-[206px] lg:mr-10">
          <LargeBlogCard.Title title={featured_post?.title} />
          <LargeBlogCard.Info
            writtenBy={featured_post?.author_name || "N/A"}
            ageFromNow={featured_post?.published_date}
          />
          <LargeBlogCard.Description
            description={featured_post?.short_description}
            link={`/blogs/${featured_post?.slug}`}
          />
        </LargeBlogCard>

        <div className="order-1 w-full md:order-2">
          <LargeImage
            src={featured_post?.feature_image}
            alt={featured_post?.title}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSingleBlog;
