import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import { generateBlurDataUrl } from "@/library/utils/image";
import Link from "next/link";

export interface IExpertCard {
  id: string | number;
  image?: string;
  alt?: string;
  name?: string;
  slug?: string;
  designation?: string;
  experience?: string;
  languages?: string;
}

const ExpertCard = async ({
  id,
  image,
  alt,
  name,
  slug,
  designation,
  experience,
  languages,
}: IExpertCard) => {
  const blurDataUrl = await generateBlurDataUrl(image);

  return (
    <div
      className={cn(
        "relative aspect-[0.72321428] overflow-hidden border border-theme-gray",
      )}
    >
      <NextImage
        src={image || ""}
        alt={alt || name || "expert"}
        blurDataURL={blurDataUrl}
        width={260}
        height={398}
        imageClassName="!object-cover"
        className="!object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 !z-[1] h-[39%] bg-[linear-gradient(180deg,rgba(20,18,19,0.00)_0%,rgba(20,18,19,0.95)_77%)]" />

      <div className="absolute bottom-6 left-0 right-0 !z-[2] flex flex-col items-center text-lg font-[250] text-theme-off-white md:text-[22px]">
        <div className="w-full bg-theme-black/40 px-4 pb-0 pt-2 backdrop-blur-sm">
          <Link href={slug ? `/our-team/${slug}` : "/our-team"}>
            <Typography
              as="h3"
              className="mb-1 line-clamp-1 break-all text-[21px] font-light text-theme-light-golden"
            >
              {name}
            </Typography>
          </Link>

          <Typography
            as="h4"
            className="block text-sm font-light text-theme-off-white"
          >
            {designation}
          </Typography>

          <Typography
            as="p"
            className="block text-xs font-light text-theme-off-white"
          >
            Experience: {experience}
          </Typography>
          <Typography
            as="p"
            className="block text-xs font-light text-theme-off-white"
          >
            Languages: {languages}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
