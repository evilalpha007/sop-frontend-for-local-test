"use client";
import Section from "@/components/blocks/Section";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import { nextFetch } from "@/library/utils/next-fetch";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface INotFoundProps {
  title?: string;
  description?: string;
  hideButton?: boolean;
}

const NotFound = ({
  title = "Ops! Page Not Found2",
  description = `The page you are looking for might have been removed had its name changed or is temporarily unavailable.`,
  hideButton = false,
}: INotFoundProps) => {
  const [pageData, setPageData] = useState<any>(null);
  const pathname = usePathname();
  const country = pathname.split("/")[1];
  const slug = pathname.split("/")[2];

  useEffect(() => {
    const getPageData = async () => {
      try {
        const res = await nextFetch<any>(
          `v1/auth/page/${slug}?country=${country}`,
        );
        console.log("🚀 ~ getPageData ~ res:", res);
        setPageData(res?.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
        return null;
      }
    };
    getPageData();
  }, [slug, country]);

  if (pageData?.id != null) {
    return (
      <>
        <Section className="flex min-h-[350px] items-end md:min-h-[60dvh] lg:py-0 xl:py-0 2xl:py-7">
          <div className={cn("absolute inset-0 !-z-20 h-full w-full")}>
            <NextImage
              src={pageData?.image || "/images/default-banner.jpg"}
              alt={"background image"}
              width={1440}
              height={705}
              className={cn("!-z-30 !h-full !w-full !object-cover")}
              imageClassName="!object-cover !h-full !w-full"
            />
          </div>

          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#1A1A1A_0%,rgba(73,73,73,0.00)_66.5%)] opacity-70" />
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(0deg,rgba(20,18,19,0.99)_15%,rgba(73,73,73,0.00)_78.88%)]" />

          <Section.Container className="!h-full w-full items-end justify-end">
            <div className="flex h-full w-full flex-col justify-end">
              <Typography
                as="h1"
                className="text-3xl font-normal uppercase text-theme-light-golden md:text-[52px] md:leading-snug"
              >
                {pageData?.title}
              </Typography>
            </div>
          </Section.Container>
        </Section>
        <Section.Container className="mt-10">
          <div className="flex flex-col gap-40 md:flex-row">
            <div className="w-full md:flex-[60%]">
              <Typography className="mt-4 text-sm font-medium leading-[30px] text-theme-off-white md:mb-14 md:text-lg">
                {pageData?.subtitle}
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: pageData?.content || "",
                }}
              />
            </div>
          </div>
        </Section.Container>
      </>
    );
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-theme-black p-20">
      <div>
        <NextImage
          src="/svg-icons/not-found/404.svg"
          alt="404"
          width={743}
          height={395}
          className="mx-auto mb-[60px] h-full w-full max-w-[743px]"
        />

        <h1 className="mb-3 text-center text-[40px] font-semibold capitalize not-italic leading-[120%] text-white">
          {title}
        </h1>

        <p className="mx-auto mb-7 w-full max-w-[458px] text-center text-base font-light not-italic leading-6 text-white">
          {description}
        </p>

        {!hideButton && (
          <div className="flex w-full flex-col items-center">
            <PrimaryButton type="button" color="primary" asChild>
              <Link href="/">Back To Homepage</Link>
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;
