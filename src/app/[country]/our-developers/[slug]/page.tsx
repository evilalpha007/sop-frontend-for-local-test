import NotFound from "@/app/not-found";
import Section from "@/components/blocks/Section";
import Typography from "@/components/elements/texts/Typography";
import DeveloperPropertyList from "@/features/Properties/DeveloperPropertyList";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";

interface IDeveloperDetailsPageProps {
  params: {
    slug?: string;
    country?: string;
  };
}

interface IDeveloperDetailsProps {
  id: string | number;
  image: string;
  name: string;
  slug: string;
  description: string;
}

const DeveloperDetailsPage = async ({ params }: IDeveloperDetailsPageProps) => {
  const { slug } = params;
  const { country } = params;
  const res = await nextFetch<TResponse<IDeveloperDetailsProps | undefined>>(
    `v1/auth/developers/${slug}?country=${country}`,
  );
  const DeveloperData = res?.data;

  if (!DeveloperData) {
    return <NotFound />;
  }

  const apiQuery = {
    country: params?.country || "uae",
    developer_id: DeveloperData?.id,
  };

  //   console.log("DeveloperDetailsPage -> res", res);
  return (
    <div className="mt-12">
      <Section.Container>
        <Section className="flex min-h-[200px] items-end md:min-h-[60dvh] lg:py-0 xl:py-0 2xl:py-7">
          <Section.BackgroundImage
            src={DeveloperData?.image || ""}
            className="h-full"
            priority
            quality={50}
            width={1440}
            height={302}
          />
        </Section>
        <Typography
          as="h1"
          className="my-4 text-start text-3xl font-light uppercase leading-normal text-theme-off-white md:text-[40px] md:!leading-none"
        >
          {DeveloperData?.name}
        </Typography>
        {/* html preview */}
        <div
          dangerouslySetInnerHTML={{
            __html: DeveloperData?.description || "",
          }}
        />
        <div className="mt-[60px]">
          <DeveloperPropertyList fragmentOnly apiQuery={apiQuery} />
        </div>
      </Section.Container>
    </div>
  );
};

export default DeveloperDetailsPage;
