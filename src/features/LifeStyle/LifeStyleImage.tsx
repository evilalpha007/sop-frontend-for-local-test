import NextImage from "@/components/elements/images/NextImage";
import { generateBlurDataUrl } from "@/library/utils/image";
import Subtitle from "./Subtitle";

interface ILifeStyleImageProps {
  id?: string | number;
  imageUrl?: string;
  name?: string;
  slug?: string;
}

const LifeStyleImage = async ({
  name,
  id,
  imageUrl,
  slug,
}: ILifeStyleImageProps) => {
  const blurDataUrl = await generateBlurDataUrl(imageUrl);

  return (
    <div className="px-2.5">
      <div className="relative flex flex-grow items-center justify-center overflow-hidden object-cover">
        <NextImage
          src={imageUrl || ""}
          alt={name || "our-lifestyle"}
          blurDataURL={blurDataUrl}
          width={271}
          height={376}
          className="sm:max-h-[375px]# sm:max-w-[270px]# h-full w-full flex-grow border border-theme-off-golden object-cover"
        />

        <Subtitle title={name} link={""} />
      </div>
    </div>
  );
};

export default LifeStyleImage;
