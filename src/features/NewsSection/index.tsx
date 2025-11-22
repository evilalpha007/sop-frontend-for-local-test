import { getFeaturedBlog } from "@/api/get-featured-blog";
import Section from "@/components/blocks/Section";
import Hr from "@/components/elements/border/Hr";
import Typography from "@/components/elements/texts/Typography";
import LargeBlogCard from "../LargeBlogCard";
import LargeImage from "../LargeBlogCard/LargeImage";
import SmallBlogCard from "../SmallBlogCard";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import { getNonResidentialBlogs } from "@/api/get-non-residential-blogs";

interface INewsSectionProps {
  className?: string;
  disableTitleSubtitle?: boolean;
  apiQuery?: {
    country?: string;
  };
  country?: string;
  type?: string;
}

export const NewsSection = async ({
  className,
  disableTitleSubtitle,
  apiQuery,
  country,
  type,
}: INewsSectionProps) => {
  let all_posts: any[] = [];
  let featured_post: any = null;

  if (type) {
    const data = await getNonResidentialBlogs(apiQuery);
    all_posts = data.all_posts || [];
    featured_post = all_posts[0];
    all_posts.shift();
  } else {
    const data = await getFeaturedBlog(apiQuery);
    all_posts = data.all_posts || [];
    featured_post = data.featured_post || null;
  }

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
              {featured_post && (
                <LargeBlogCard className="order-2 w-full md:order-1 md:max-w-[206px] lg:mr-10">
                  <LargeBlogCard.Title title={featured_post.title} />
                  <LargeBlogCard.Info
                    writtenBy={featured_post.author_name || "N/A"}
                    ageFromNow={featured_post.published_date}
                  />
                  <LargeBlogCard.Description
                    description={
                      featured_post.short_description ??
                      featured_post.description
                    }
                    link={
                      apiQuery?.country
                        ? `/${apiQuery.country}/blogs/${featured_post.slug}`
                        : `/blogs/${featured_post.slug}`
                    }
                  />
                </LargeBlogCard>
              )}

              {featured_post?.feature_image && (
                <div className="order-1 w-full md:order-2">
                  <LargeImage
                    src={featured_post.feature_image}
                    alt={featured_post.title}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid w-full md:w-2/6">
            {all_posts.slice(0, 3).map((post, index) => (
              <div key={index}>
                <SmallBlogCard
                  title={post?.title}
                  description={post?.short_description ?? post?.description}
                  author_name={post?.author_name || "N/A"}
                  date={post?.published_date}
                  image={post?.feature_image}
                  slug={post?.slug}
                  country={apiQuery?.country}
                />
              </div>
            ))}
          </div>
        </div>
      </Section.Container>

      <Section.Container>
        <div className="mt-4 flex items-center justify-center gap-4 sm:mt-5">
          <OutlineButton
            className="flex-grow py-2 sm:flex-grow-0 md:py-2.5"
            asChild
          >
            <Typography
              as="a"
              target="_blank"
              href={
                country && country !== "uae" ? `/${country}/blogs` : "/blogs"
              }
            >
              Show All
            </Typography>
          </OutlineButton>
        </div>
      </Section.Container>
    </>
  );
};
