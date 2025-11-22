import { getFeaturedBlog } from "@/api/get-featured-blog";
import Section from "@/components/blocks/Section";
import Hr from "@/components/elements/border/Hr";
import Typography from "@/components/elements/texts/Typography";
import LargeBlogCard from "../LargeBlogCard";
import LargeImage from "../LargeBlogCard/LargeImage";
import SmallBlogCard from "../SmallBlogCard";

interface INewsSectionProps {
  className?: string;
  disableTitleSubtitle?: boolean;
  apiQuery?: {
    country?: string;
  };
}

export const NewsSection = async ({
  className,
  disableTitleSubtitle,
  apiQuery,
}: INewsSectionProps) => {
  const { all_posts, featured_post } = await getFeaturedBlog(apiQuery);

  return (
    <>
      <Section.Container className={className}>
        {!disableTitleSubtitle && (
          <div className="mx-auto mb-[42px] w-full max-w-[551px]">
            <Typography
              as="h2"
              className="md-[10px] text-center text-sm font-medium uppercase text-theme-off-white sm:mb-4 md:mb-7 md:text-[32px]"
            >
              News
            </Typography>
            <Typography
              as="p"
              className="text-center text-[12px] font-medium leading-4 text-theme-off-white text-opacity-80 md:text-lg md:leading-[26px]"
            >
              Our team constantly shares the latest news about life, the real
              estate market and important events.
            </Typography>
          </div>
        )}

        <div className="flex h-full w-full flex-col gap-[18px] md:flex-row">
          <div className="h-full w-full md:w-4/6">
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

          <div className="grid w-full md:w-2/6">
            <SmallBlogCard
              title={all_posts?.[0]?.title}
              description={all_posts?.[0]?.short_description}
              author_name={all_posts?.[0]?.author_name || "N/A"}
              date={all_posts?.[0]?.published_date}
              image={all_posts?.[0]?.feature_image}
              slug={all_posts?.[0]?.slug}
            />
            <Hr className="my-5 opacity-50" />
            <SmallBlogCard
              title={all_posts?.[1]?.title}
              description={all_posts?.[1]?.short_description}
              author_name={all_posts?.[1]?.author_name || "N/A"}
              date={all_posts?.[1]?.published_date}
              image={all_posts?.[1]?.feature_image}
              slug={all_posts?.[1]?.slug}
            />
            <Hr className="my-5 opacity-50" />
            <SmallBlogCard
              title={all_posts?.[2]?.title}
              description={all_posts?.[2]?.short_description}
              author_name={all_posts?.[2]?.author_name || "N/A"}
              date={all_posts?.[2]?.published_date}
              image={all_posts?.[2]?.feature_image}
              slug={all_posts?.[2]?.slug}
            />
          </div>
        </div>
      </Section.Container>
    </>
  );
};
