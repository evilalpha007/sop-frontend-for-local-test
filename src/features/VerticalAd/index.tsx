import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Close from "./Close";
import Link from 'next/link'

interface IVerticalAdProps {
  data?: any;
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const VerticalAd = ({
  data,
  className,
  containerClassName,
  imageClassName,
}: IVerticalAdProps) => {
  return (
    <div
      className={cn(
        "relative border border-theme-light-golden",
        containerClassName,
      )}
    >
      <Link href={data?.ad_url ?? ""}>
        <NextImage
          src={data?.ad_image ?? "/images/ad/vertical-ad-bg.svg"}
          alt="vertical-ad-bg"
          width={296}
          height={565}
          imageClassName={imageClassName}
          className={cn("!z-0 h-full w-full", className)}
        />
      </Link>


    </div>
  );
};

export default VerticalAd;
