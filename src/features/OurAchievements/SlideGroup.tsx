import NextImage from "@/components/elements/images/NextImage";

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

const SlideGroup = ({
  id,
  one: { src: src1, alt: alt1 },
  two: { src: src2, alt: alt2 },
  three: { src: src3, alt: alt3 },
  four: { src: src4, alt: alt4 },
}: ISlideGroupProps) => {
  return (
    <div>
      <div className="flex items-center gap-[18.59px] px-2">
        <div className="relative hidden flex-grow items-center justify-end overflow-hidden object-cover md:flex">
          <NextImage
            src={src1 || ""}
            alt={alt1 || "our-achievement"}
            width={271}
            height={376}
            className="h-full max-h-[340px] w-full max-w-[253px] flex-grow border border-theme-off-golden object-cover opacity-80"
          />
        </div>

        <div className="relative flex flex-grow items-center justify-center overflow-hidden object-cover">
          <NextImage
            src={src2 || ""}
            alt={alt2 || "our-achievement"}
            width={271}
            height={376}
            className="h-full w-full flex-grow border border-theme-off-golden object-cover sm:max-h-[375px] sm:max-w-[270px]"
          />
        </div>

        <div className="relative hidden flex-grow items-center justify-center overflow-hidden sm:flex">
          <NextImage
            src={src3 || ""}
            alt={alt3 || "our-achievement"}
            width={271}
            height={376}
            className="h-full w-full flex-grow border border-theme-off-golden object-cover sm:max-h-[375px] sm:max-w-[270px]"
          />
        </div>

        <div className="relative hidden flex-grow items-center justify-start overflow-hidden object-cover md:flex">
          <NextImage
            src={src4 || ""}
            alt={alt4 || "our-achievement"}
            width={271}
            height={376}
            className="h-full max-h-[340px] w-full max-w-[253px] flex-grow border border-theme-off-golden object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default SlideGroup;
