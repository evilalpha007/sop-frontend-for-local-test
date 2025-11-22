import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";

interface IDubaiBlogCardProps {
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
  author_name?: string;
  date?: string;
  slug?: string;
  country?: string;
}

const DubaiBlogCard = ({
  image,
  alt,
  title,
  description,
  author_name,
  date,
  slug,
  country = "uae",
}: IDubaiBlogCardProps) => {
  return (
    <div className="flex h-full items-start gap-3.5">
      <div className="h-full w-2/5 md:w-2/5">
        <NextImage
          src={image || "/images/blog/1.svg"}
          alt={alt || "blog-thumbnail"}
          width={202}
          height={127}
          className="h-full w-full"
          imageClassName="!object-cover"
        />
      </div>

      <div className="w-3/5 md:w-3/5">
        <Typography className="mb-2.5 line-clamp-2 text-sm font-normal text-white">
          <Link href={`/${country}/exclusive-areas/${slug}`}>{title}</Link>
        </Typography>

        <Typography className="mb-2.5 line-clamp-2 text-xs font-normal leading-4 text-white text-opacity-60">
          {description}
        </Typography>

        <div className="flex items-center gap-4">
          <Typography className="font-roboto text-xs font-normal leading-4 text-white text-opacity-60">
            {author_name}
          </Typography>

          <Typography className="font-roboto text-xs font-normal leading-4 text-white text-opacity-60">
            I
          </Typography>

          <Typography className="font-roboto text-xs font-normal leading-4 text-white text-opacity-60">
            {date}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default DubaiBlogCard;
