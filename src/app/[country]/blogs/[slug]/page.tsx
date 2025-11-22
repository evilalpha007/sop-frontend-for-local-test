import { getBlogDetails } from "@/api/get-blog-details";
import NotFound from "@/app/not-found";
import Section from "@/components/blocks/Section";
import Typography from "@/components/elements/texts/Typography";
import SmallBlogCard from "@/features/SmallBlogCard";
import { getDistanceFromNow } from "@/library/utils/distance-from-now";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";

interface IBlogDetailsPageProps {
  params: { slug?: string; country?: string };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/in/blogs",
  });

  const seoData = data[0];

  return {
    title:
      seoData?.title ||
      "Silver Oak Real Estate India | Exclusive Homes & Investment Opportunities",
    description: seoData?.description,
    keywords: seoData?.keywords,
    openGraph: {
      title: seoData?.title,
      description: seoData?.description,
      url: seoData?.route,
      type: "website",
    },
  };
}

const BlogDetailsPage = async ({
  params: { slug, country },
}: IBlogDetailsPageProps) => {
  const { blogData, read_also, isBlogNotFound } = await getBlogDetails({
    country: country,
    slug,
  });
  // console.log("🚀 ~ blogData:", blogData)
  // console.log("🚀 blog details ~ { slug, country }:", { slug, country });

  // If no data or an error occurs, show a "Blog Not Found" message
  if (isBlogNotFound) {
    return (
      <NotFound
        title="Ops! Blog Not Found"
        description="The blog you are looking for might have been removed had its name changed or is temporarily unavailable. Please check the URL and try again."
        hideButton
      />
    );
  }

  return (
    <div>
      <Section className="flex min-h-[350px] items-end md:min-h-[60dvh] lg:py-0 xl:py-0 2xl:py-7">
        <Section.BackgroundImage
          src={blogData.feature_image || "/images/default-banner.jpg"} // Fallback image if none provided
          className="h-full"
          priority
          quality={50}
          width={1440}
          height={302}
        />

        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#1A1A1A_0%,rgba(73,73,73,0.00)_66.5%)] opacity-70" />
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(0deg,rgba(20,18,19,0.99)_15%,rgba(73,73,73,0.00)_78.88%)]" />

        <Section.Container className="!h-full w-full items-end justify-end">
          <div className="flex h-full w-full flex-col justify-end">
            <Typography
              as="h1"
              className="text-3xl font-normal uppercase text-theme-light-golden md:text-[52px] md:leading-snug"
            >
              {blogData.title}
            </Typography>

            <div className="mt-5 flex items-center gap-4">
              <Typography
                as="p"
                className="text-sm font-normal text-theme-off-white md:text-[26px]"
              >
                Author: {blogData.author_name}
              </Typography>

              <Typography
                as="p"
                className="text-sm font-normal text-theme-off-white md:text-[26px]"
              >
                I
              </Typography>

              <Typography
                as="p"
                className="text-sm font-normal text-theme-off-white md:text-[26px]"
              >
                {blogData?.published_date
                  ? getDistanceFromNow(blogData?.published_date)
                  : "N/A"}
              </Typography>
            </div>
          </div>
        </Section.Container>
      </Section>

      <Section.Container className="mt-10">
        <div className="flex flex-col gap-40 md:flex-row">
          <div className="w-full md:flex-[60%]">
            <Typography className="mt-4 text-sm font-medium leading-[30px] text-theme-off-white md:mb-14 md:text-lg">
              {blogData?.short_description}
            </Typography>

            {/* show description with html view*/}
            <div
              dangerouslySetInnerHTML={{
                __html: blogData?.description || "",
              }}
            />
          </div>

          {/* <div className="w-full md:flex-[25%]">
            <VerticalAd />
          </div> */}
        </div>
        <br />
        <br />

        <div>
          <Typography className="mb-6 text-[32px] font-light text-theme-light-golden">
            Read Also
          </Typography>

          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
            {/* Add dynamic recommended posts or related articles */}
            {read_also?.map((blog) => (
              <SmallBlogCard
                key={blog.id}
                title={blog?.title || ""}
                slug={blog?.slug || ""}
                description={blog?.short_description || ""}
                author_name={blog?.author_name || ""}
                date={
                  blog?.published_date
                    ? new Date(blog?.published_date || "").toLocaleDateString()
                    : "N/A"
                }
                image={blog?.feature_image || ""}
                country={country}
              />
            ))}
          </div>
        </div>
      </Section.Container>
    </div>
  );
};

export default BlogDetailsPage;
