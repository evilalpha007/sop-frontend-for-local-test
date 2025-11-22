import CombinedImages from "./CombinedImages";
import { TNextImageProps } from "./type";

const NextImage = (props: TNextImageProps) => {
  return <CombinedImages {...props} />;
};

export default NextImage;
