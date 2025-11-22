import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { generateBlurDataUrl } from "@/library/utils/image";
import Link from "next/link";

interface ISmallBlogCardProps {
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
  author_name?: string;
  date?: string;
  slug?: string;
  country?: string;
}

const SmallBlogCard = async ({
  image,
  alt,
  title,
  description,
  author_name,
  date,
  slug,
  country,
}: ISmallBlogCardProps) => {
  const blurDataUrl = await generateBlurDataUrl(image);
  return (
    <div className="flex h-full items-start gap-3.5">
      <div className="h-full w-2/5 md:w-2/5">
        <NextImage
          src={image || ""}
          alt={alt || "blog-thumbnail"}
          blurDataURL={blurDataUrl}
          width={202}
          height={127}
          className="h-full w-full"
          imageClassName="!object-cover"
        />
      </div>

      <div className="w-3/5 md:w-3/5">
        <Typography className="mb-2.5 line-clamp-2 text-[13px] font-normal text-white">
          <Link
            href={
              country
                ? `/${country == "uae" ? "blogs/" : country + "/blogs/"}${slug}`
                : `/blogs/${slug}`
            }
          >
            {title}
          </Link>
        </Typography>

        <Typography className="mb-2.5 line-clamp-2 text-[10px] font-normal leading-4 text-white text-opacity-60">
          {description}
        </Typography>

        <div className="flex items-center gap-4">
          <Typography className="font-roboto text-[10px] font-normal leading-4 text-white text-opacity-60">
            {author_name}
          </Typography>
          <Typography className="font-roboto text-[10px] font-normal leading-4 text-white text-opacity-60">
            {date}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SmallBlogCard;
