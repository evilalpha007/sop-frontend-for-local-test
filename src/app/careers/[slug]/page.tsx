import NotFound from "@/app/not-found";
import Section from "@/components/blocks/Section/index";
import Typography from "@/components/elements/texts/Typography";
import BreadCrumb from "@/features/BreadCrumb";
import JobSpecifications from "@/features/JobSpecifications";
import ApplyJobForm from "@/features/JobSpecifications/ApplyJobForm";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import { Metadata } from "next";

export interface IJobDetailsProps {
  id?: number;
  title?: string;
  slug?: string;
  experience?: string;
  type_of_job?: string;
  job_location?: string;
  description?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/careers",
  });

  const seoData = data[0];

  return {
    title:
      seoData?.title ||
      "Silver Oak Real Estate | Exclusive Homes & Investment Opportunities",
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

const JobDetailsPage = async ({ params }: { params: { slug?: string } }) => {
  const { slug } = params;

  let JobDetailsData: IJobDetailsProps | undefined;

  try {
    // Fetch job details using the slug dynamically
    const res = await nextFetch<TResponse<IJobDetailsProps | undefined>>(
      `v1/auth/careers/${slug}`,
    );

    // Check if response is not ok or data is not available
    if (!res || !res.data) {
      throw new Error("Job not found");
    }
    JobDetailsData = res.data;
  } catch (error) {
    // Log the error (optional)
    console.error(error);

    // If an error occurs or no job details found, set to undefined
    JobDetailsData = undefined;
  }

  // console.log("careers slug", slug);

  // If no data or an error occurs, show a "Job Not Found" message
  if (!JobDetailsData) {
    return <NotFound />;
  }

  const jobDetailsPageBreadCrumbData = [
    { title: "Home", link: "/" },
    { title: "Careers", link: "/careers" },
    {
      title: `${JobDetailsData.title}`,
      link: `/careers/${JobDetailsData?.slug}`,
    },
  ];

  return (
    <Section className="md:pb-0 lg:pb-0 xl:pb-0 2xl:pb-0">
      <Section.HeroContainer>
        <Section.Container>
          <BreadCrumb
            data={jobDetailsPageBreadCrumbData}
            className="mb-12 mt-9"
          />
        </Section.Container>
      </Section.HeroContainer>

      <Section.Container>
        <Typography
          as="h1"
          className="mb-10 text-center text-2xl font-medium !leading-snug text-theme-off-white md:text-[42px] md:!leading-snug"
        >
          {JobDetailsData?.title}
        </Typography>

        <JobSpecifications JobDetailsData={JobDetailsData} />

        {/* show description with html view*/}
        <div
          dangerouslySetInnerHTML={{
            __html: JobDetailsData?.description || "",
          }}
        />

        <ApplyJobForm params={params} data={JobDetailsData} />
      </Section.Container>
    </Section>
  );
};

export default JobDetailsPage;
