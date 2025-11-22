import { ICareersPageProps } from "@/app/careers/page";
import Hr from "@/components/elements/border/Hr";
import Button from "@/components/elements/buttons/Button";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Link from "next/link";

// Function to convert YouTube share URL to embed URL
const convertToEmbedUrl = (url: string) => {
  const videoId = url.split("v=")[1]?.split("&")[0]; // Extract video ID
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`; // Return the embed URL
  }
  return url; // If not a valid YouTube URL, return the original URL
};

interface IWhyWorkWithSopVideosProps {
  className?: string;
  careersData: ICareersPageProps;
}

const WhyWorkWithSopVideos = async ({
  className,
  careersData,
}: IWhyWorkWithSopVideosProps) => {
  const smallVideoGallery = careersData?.video_gallery || [];

  return (
    <div
      className={cn(
        "border border-solid border-theme-off-white border-opacity-20 bg-theme-gray bg-opacity-20",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-x-16 p-[50px] md:flex-row">
        <div className="flex w-full flex-col items-center justify-center md:flex-[45%] md:items-start">
          <Typography
            as="h2"
            className={cn(
              "relative inline-block cursor-pointer disabled:cursor-not-allowed",
              "after:absolute after:-bottom-6 after:left-0 after:right-0 after:w-full after:scale-x-0 after:border-b-[3px] after:border-b-theme-off-white after:opacity-0 after:transition-all after:duration-300 after:content-[''] after:hover:scale-x-100 after:hover:opacity-100",
              "text-xs font-bold text-theme-off-white sm:text-[39px]",
              "after:scale-x-100 after:border-b-theme-light-golden after:opacity-100",
            )}
          >
            {careersData?.title}
          </Typography>

          <Typography
            as="p"
            className="mb-[37px] mt-10 pr-2.5 text-center text-sm font-light text-theme-off-white md:text-start md:text-xl"
          >
            {careersData?.description}
          </Typography>

          <Button className="hidden items-center gap-3.5 border border-theme-light-golden px-[35px] py-3.5 text-xl font-normal text-white md:flex">
            <Link
              href={"https://www.youtube.com/channel/UCumxu3ox9xTMZZCtTY6zI0w"}
              target="_blank"
              className="flex flex-row items-center justify-center gap-3.5"
            >
              <NextImage
                src="/svg-icons/why-work-with-sop/play-icon.svg"
                alt="play-icon"
                width={18}
                height={18}
                className="size-[18px]"
                disableBlur
              />
              {careersData?.button_text}
            </Link>
          </Button>
        </div>

        <div className="w-full md:flex-[45%]">
          <div className="relative">
            <iframe
              width="560"
              height="315"
              src={convertToEmbedUrl(careersData?.feature_video || "")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="aspect-[16/9] w-full max-w-[560px] rounded-[10px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <Hr className="border-opacity-30" />

      <div className="mb-[53px] mt-[49px] grid gap-5 px-[50px] md:grid-cols-4">
        {smallVideoGallery?.map((smallVideo) => (
          <div key={smallVideo}>
            <iframe
              width="265"
              height="149"
              src={convertToEmbedUrl(smallVideo)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="aspect-[16/9] w-full rounded-[10px]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyWorkWithSopVideos;
