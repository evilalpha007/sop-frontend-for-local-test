import NextImage from "@/components/elements/images/NextImage";
import Subtitle from "./Subtitle";
import { generateBlurDataUrl } from "@/library/utils/image";

export interface ISlideImageProps {
  id?: string | number;
  link?: string;
  src?: string;
  alt?: string;
  title?: string;
}

export interface ISlideGroupProps {
  id: string | number;
  one: ISlideImageProps;
  two: ISlideImageProps;
  three: ISlideImageProps;
  four: ISlideImageProps;
}

const SlideGroup = async ({
  one: { src: src1, alt: alt1, title: title1, link: link1 },
  two: { src: src2, alt: alt2, title: title2, link: link2 },
  three: { src: src3, alt: alt3, title: title3, link: link3 },
  four: { src: src4, alt: alt4, title: title4, link: link4 },
}: ISlideGroupProps) => {
  const blurDataURL1 = await generateBlurDataUrl(src1 || "");
  const blurDataURL2 = await generateBlurDataUrl(src2 || "");
  const blurDataURL3 = await generateBlurDataUrl(src3 || "");
  const blurDataURL4 = await generateBlurDataUrl(src4 || "");
  return (
    <div>
      <div className="flex items-center gap-[18.59px] px-2">
        <div className="relative hidden flex-grow items-center justify-end overflow-hidden object-cover md:flex">
          <NextImage
            src={src1 || ""}
            alt={alt1 || "our-achievement"}
            blurDataURL={blurDataURL1}
            width={271}
            height={376}
            className="h-full max-h-[340px] w-full max-w-[253px] flex-grow border border-theme-off-golden object-cover opacity-80"
          />

          <Subtitle title={title1} link={link1} />
        </div>

        <div className="relative flex flex-grow items-center justify-center overflow-hidden object-cover">
          <NextImage
            src={src2 || ""}
            alt={alt2 || "our-achievement"}
            blurDataURL={blurDataURL2}
            width={271}
            height={376}
            className="h-full w-full flex-grow border border-theme-off-golden object-cover sm:max-h-[375px] sm:max-w-[270px]"
          />

          <Subtitle title={title2} link={link2} />
        </div>

        <div className="relative hidden flex-grow items-center justify-center overflow-hidden sm:flex">
          <NextImage
            src={src3 || ""}
            alt={alt3 || "our-achievement"}
            blurDataURL={blurDataURL3}
            width={271}
            height={376}
            className="h-full w-full flex-grow border border-theme-off-golden object-cover sm:max-h-[375px] sm:max-w-[270px]"
          />

          <Subtitle title={title3} link={link3} />
        </div>

        <div className="relative hidden flex-grow items-center justify-start overflow-hidden object-cover md:flex">
          <NextImage
            src={src4 || ""}
            alt={alt4 || "our-achievement"}
            blurDataURL={blurDataURL4}
            width={271}
            height={376}
            className="h-full max-h-[340px] w-full max-w-[253px] flex-grow border border-theme-off-golden object-cover opacity-80"
          />

          <Subtitle title={title4} link={link4} />
        </div>
      </div>
    </div>
  );
};

export default SlideGroup;
