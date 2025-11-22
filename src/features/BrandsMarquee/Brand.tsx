import NextImage from "@/components/elements/images/NextImage";
import { generateBlurDataUrl } from "@/library/utils/image";

export interface IBrandProps {
  id: string | number;
  image: string;
  alt?: string;
}

const Brand = async ({ id, image, alt }: IBrandProps) => {
  const blurDataURL = await generateBlurDataUrl(image);

  return (
    <div className="h-4 w-[33px] bg-[#ECECEC] p-0.5 sm:h-[52px] sm:w-[100px] sm:p-2">
      <NextImage
        src={image || ""}
        blurDataURL={blurDataURL}
        alt={alt || "Brand"}
        width={100}
        height={52}
        className="h-full w-full"
      />
    </div>
  );
};

export default Brand;
