import Hr from "@/components/elements/border/Hr";
import NextImage from "@/components/elements/images/NextImage";
import { cn } from "@/library/utils/cn";
import { generateBlurDataUrl } from "@/library/utils/image";

export interface IServiceProps {
  className?: string;
  flip?: boolean;
  image?: string;
  title: string;
  description: string[];
}

const Service = async ({
  className,
  flip,
  image,
  title,
  description,
}: IServiceProps) => {
  const topImageBlurDataUrl = await generateBlurDataUrl(image);
  const bottomImageUrl = "/images/who-we-are/our-services/bg-image.svg";
  const bottomImageBlurDataUrl = await generateBlurDataUrl(bottomImageUrl);

  return (
    <div
      className={cn(
        "relative flex w-fit flex-col items-center justify-between gap-6",
        flip ? "flex-col lg:flex-row-reverse" : "lg:flex-row",
      )}
    >
      <div className="shrink-0">
        <div
          className={cn(
            "relative z-0 w-fit",
            flip ? "md:mr-[138px]" : "md:ml-[138px]",
          )}
        >
          <NextImage
            src={image || ""}
            alt="Top"
            blurDataURL={topImageBlurDataUrl}
            width={572}
            height={415}
            className="z-[0] h-full w-full lg:max-w-[540px]"
          />

          <NextImage
            src={bottomImageUrl}
            alt="Bottom"
            blurDataURL={bottomImageBlurDataUrl}
            width={572}
            height={415}
            className="bg-green-500# absolute !right-10 -bottom-4 left-5 top-0 !z-[-5] w-[calc(100%-40px)]"
          />

          <div
            className={cn(
              "absolute bottom-0 w-full sm:top-[64%] md:top-10",
              flip ? "md:!right-[-420px]" : "md:left-[-138px]",
            )}
          >
            <div className="flex w-full max-w-[263px] items-center justify-center border border-solid border-theme-off-white border-opacity-90 bg-theme-black bg-opacity-90 px-2 py-4">
              <p className="w-full text-center text-lg font-normal text-theme-light-golden md:text-2xl">
                {title}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Hr
        className={cn(
          "absolute bottom-1.5 -mb-12 hidden border-b-theme-light-golden md:mt-12 lg:block",
          flip
            ? "right-[140px] md:left-0 md:w-[calc(100%_-_140px)]"
            : "right-0 md:left-[140px] md:w-[calc(100%_-_30px)]",
        )}
      />

      <div>
        <ul className="list-outside list-disc pl-10">
          {description?.map((desc) => (
            <li
              key={desc}
              className="text-[15px] font-normal leading-[30px] text-theme-off-white md:text-xl md:leading-[50px]"
            >
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Service;
