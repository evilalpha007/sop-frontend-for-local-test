import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { generateBlurDataUrl } from "@/library/utils/image";
import CountBox from "./CountBox";

export interface ICardProps {
  item: any;
}

const Card = async ({ item }: ICardProps) => {
  const blurDataURL = await generateBlurDataUrl(item.icon);
  return (
    <div className="flex w-full items-center justify-between gap-5 border border-theme-off-white border-opacity-20 px-4 py-6 sm:gap-9 md:p-10">
      <div className="flex items-center gap-5 sm:gap-8">
        <NextImage
          src={item.icon || ""}
          alt={"count-up image"}
          blurDataURL={blurDataURL}
          width={64}
          height={69}
          className="w-10 sm:w-16"
        />

        <div className="h-[35px] border-r border-r-theme-off-white sm:h-[66px]" />
      </div>

      <div className="flex w-full flex-col items-start gap-0">
        <CountBox count={item.counter} postfix={item.prefix} />

        <Typography
          as="p"
          className="w-full text-wrap break-words font-raleway text-[11px] font-light leading-[13px] text-theme-light-golden sm:text-[20px] sm:leading-normal"
        >
          {item.title}
        </Typography>
      </div>
    </div>
  );
};

export default Card;
