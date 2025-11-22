import NextImage from "@/components/elements/images/NextImage";
import { generateBlurDataUrl } from "@/library/utils/image";

interface IPartner {
  id: string | number;
  image?: string | null;
  alt?: string | null;
}

const Partner = async ({ id, image, alt }: IPartner) => {
  const blurData = await generateBlurDataUrl(image);

  return (
    <NextImage
      src={image || ""}
      alt={alt || "our partner"}
      width={262}
      height={166}
      //   className="h-[166px] w-[262px]"
      className="w-full"
      blurDataURL={blurData}
    />
  );
};

export default Partner;
