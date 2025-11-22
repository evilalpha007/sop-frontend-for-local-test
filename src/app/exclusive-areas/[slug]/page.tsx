import NotFound from "@/app/not-found";
import Section from "@/components/blocks/Section/index";
import Typography from "@/components/elements/texts/Typography";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

interface IGuideProps {
  id?: number;
  title: string;
  short_description: string;
  description: string;
  feature_image: string;
  alt_text: string | null;
  meta_title: string | null;
  meta_description: string | null;
  author_name: string;
  published_date: string;
  read_also:
    | [
        {
          id: number;
          title: string;
          slug: string;
          short_description: string;
          feature_image: string;
          author_name: string;
          published_date: string;
        },
      ]
    | [];
}

const GuideDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  let GuideData: IGuideProps | undefined;

  try {
    // Fetch guide details dynamically using the slug
    const res = await nextFetch<TResponse<IGuideProps | undefined>>(
      `v1/auth/guides/${slug}`,
    );

    if (!res || !res.data) {
      throw new Error("Guide not found");
    }

    GuideData = res.data;
  } catch (error) {
    console.error(error);
    GuideData = undefined;
  }

  // If no data or an error occurs, show a "Guide Not Found" message
  if (!GuideData) {
    return <NotFound />;
  }

  const relatedGuides = GuideData.read_also || [];

  return (
    <div>
      <Section className="flex min-h-[60dvh] items-end lg:py-0 xl:py-0 2xl:py-7">
        <Section.BackgroundImage
          src={GuideData.feature_image || "/images/default-banner.jpg"} // Fallback image if none provided
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
              className="text-5xl font-normal uppercase text-theme-light-golden md:text-[52px]"
            >
              {GuideData.title}
            </Typography>

            <div className="mt-5 flex items-center gap-4">
              <Typography
                as="p"
                className="text-sm font-normal text-theme-off-white md:text-[26px]"
              >
                by: {GuideData.author_name}
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
                {GuideData.published_date}
              </Typography>
            </div>
          </div>
        </Section.Container>
      </Section>

      <Section.Container className="mt-10">
        <div className="flex flex-col gap-40 md:flex-row">
          <div className="w-full">
            <Typography className="mt-4 text-sm font-medium leading-[30px] text-theme-off-white md:mb-14 md:text-lg">
              {GuideData.short_description}
            </Typography>

            {/* Show description with HTML view */}
            <div
              dangerouslySetInnerHTML={{
                __html: GuideData?.description || "",
              }}
            />
          </div>
        </div>

        {/* <div>
          <Typography className="mb-6 text-[32px] font-light text-theme-light-golden">
            Read Also
          </Typography>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
            {relatedGuides.map((guide) => (
              <SmallBlogCard
                key={guide.id}
                title={guide.title}
                slug={guide.slug}
                description={guide.short_description}
                author_name={guide.author_name}
                date={new Date(guide.published_date).toLocaleDateString()}
                image={guide.feature_image}
              />
            ))}
          </div>
        </div> */}
      </Section.Container>
    </div>
  );
};

export default GuideDetailsPage;
