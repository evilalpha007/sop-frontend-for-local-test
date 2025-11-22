import Hr from "@/components/elements/border/Hr";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { generateBlurDataUrl } from "@/library/utils/image";

export interface IKeyFeatureCardProps {
  id: string | number;
  icon?: string | null | undefined;
  alt?: string | null | undefined;
  title?: string | null;
  description?: string | null;
  width?: 135;
  height?: 139;
}

const KeyFeatureCard = async ({
  icon,
  alt,
  title,
  description,
  width,
  height,
}: IKeyFeatureCardProps) => {
  const blurDataURL = await generateBlurDataUrl(icon);

  return (
    <div className="px-2 sm:px-0 lg:max-w-[340px] lg:flex-[30%]">
      <div className="flex h-full min-h-[350px] w-full flex-col items-center border border-solid border-theme-off-white border-opacity-20 sm:min-h-0">
        <div className="flex w-full items-center justify-center px-[35px] pt-[35px]">
          <NextImage
            src={icon || ""}
            alt={(alt ?? "") || (title ?? "")}
            blurDataURL={blurDataURL}
            width={width || 135}
            height={height || 142}
            className="w-full max-w-[110px] flex-1 overflow-hidden sm:max-w-[135px]"
          />
        </div>

        <div className="px-[35px]">
          <Hr className="mb-[17px] mt-4 w-full flex-grow" />
        </div>

        <Typography
          as="h3"
          className="px-[45px] text-center text-sm font-medium leading-[17px] text-white sm:text-[22px] sm:leading-[26px]"
        >
          {title}
        </Typography>

        <Typography
          as="p"
          className="mt-4 px-6 pb-[35px] text-center text-[11px] font-medium leading-5 text-white opacity-50 sm:text-xs"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default KeyFeatureCard;
