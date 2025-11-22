import { blurBgUrlFallback } from "@/library/utils/image";
import { TNextImageProps, TNextImageWithOptimization } from "./type";
import WithOptimization from "./WithOptimization";
import WithoutOptimization from "./WithoutOptimization";

const CombinedImages = ({
  blurDataURL = blurBgUrlFallback,
  ...restProps
}: TNextImageProps) => {
  return (
    <>
      {"width" in restProps ? (
        <WithOptimization
          {...(restProps as TNextImageWithOptimization)}
          blurDataURL={blurDataURL}
        />
      ) : (
        <WithoutOptimization {...restProps} blurDataURL={blurDataURL} />
      )}
    </>
  );
};

export default CombinedImages;
