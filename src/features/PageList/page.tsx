import { getBlogList } from "@/api/get-blog-list";
import Typography from "@/components/elements/texts/Typography";
import SmallBlogCard from "../SmallBlogCard";
import { getPageList } from "@/api/get-page-list";

const PageList = async ({ country = "uae" }: { country?: string }) => {
  const { pageListData } = await getPageList({ country });

  return (
    <div>
      <div className="mx-auto mb-[42px] w-full max-w-[551px]">
        <Typography
          as="h2"
          className="md-[10px] text-center text-sm font-medium uppercase text-theme-off-white sm:mb-4 md:mb-7 md:text-[32px]"
        >
          All Pages
        </Typography>
        <Typography
          as="p"
          className="text-center text-[12px] font-medium leading-4 text-theme-off-white text-opacity-80 md:text-lg md:leading-[26px]"
        >
          Latest available pages
        </Typography>
      </div>

      <div className="grid h-full gap-[18px] md:grid-cols-2 lg:grid-cols-2">
        {pageListData?.map((blog: any, index: number) => (
          <SmallBlogCard
            key={index}
            title={blog?.title}
            description={blog?.subtitle}
            alt={blog?.title}
            date={blog?.published_date}
            image={blog?.feature_image ?? blog?.image}
            slug={blog?.slug}
            country={country}
          />
        ))}
      </div>
    </div>
  );
};

export default PageList;
