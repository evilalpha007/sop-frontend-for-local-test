import Button from "@/components/elements/buttons/Button";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Avatar from "./Avatar";
import Rating from "./Rating";
import Link from "next/link";

export interface IReviewProps {
  id: string | number;
  className?: string;
  name?: string;
  image?: string;
  alt?: string;
  role?: string;
  rating?: number | string;
  review?: string;
  country?: string;
}

const Review = ({
  id,
  name,
  rating,
  review,
  role,
  className,
  image,
  alt,
  country,
}: IReviewProps) => {
  const googleLink =
    country == "uae"
      ? "https://maps.app.goo.gl/43njByeJTFRsP8QRA"
      : "https://maps.app.goo.gl/tZB4abKJS5fhMxyJ7";
  return (
    <div
      className={cn(
        "flex h-full flex-col border border-solid border-theme-off-white border-opacity-20 bg-theme-gray bg-opacity-20 p-4 sm:p-6",
        className,
      )}
    >
      <div className="flex items-center gap-[9px] sm:gap-5">
        <Avatar src={image || ""} alt={alt ?? "Avatar"} />

        <div>
          <Typography
            as="h3"
            className="text-wrap break-words text-[17px] font-medium text-theme-light-golden sm:text-[22px]"
          >
            {name}
          </Typography>

          <Typography
            as="p"
            className="mt-[5.38px] text-wrap break-words text-[12px] font-medium text-theme-off-white sm:mt-[2.8px] sm:text-xs"
          >
            {role}
          </Typography>

          <div className="mt-2.5 flex items-center gap-[10.55px]">
            <Rating
              maxRating={5}
              rating={Number(rating)}
              className="text-theme-light-golden"
            />

            <Typography className="flex items-center font-roboto text-[13px] font-normal uppercase leading-none text-theme-off-white opacity-50 sm:text-[17px]">
              {rating}
            </Typography>
          </div>
        </div>
      </div>

      <div className="relative mt-3 flex flex-1 flex-col">
        <p className="line-clamp-5 text-ellipsis text-[12px] font-medium leading-[25px] text-theme-off-white opacity-80 sm:text-sm">
          {review}
        </p>

        <div className="mt-auto flex items-center justify-end pt-4">
          <span className="h-5 w-12 bg-[linear-gradient(270deg,#232223_23.26%,rgba(35,34,35,0.00)_142.86%)]" />

          <a href={googleLink}>
            <Button
              className={cn(
                "z-[1] bg-[#232122] text-[11px] font-medium text-theme-light-golden sm:text-xs",
              )}
            >
              Read All
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Review;
