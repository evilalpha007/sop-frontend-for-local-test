// import { generateBlurDataUrl } from "@/library/utils/image";
// import { TNextImageProps, TNextImageWithOptimization } from "./type";
// import WithOptimization from "./WithOptimization";
// import WithoutOptimization from "./WithoutOptimization";
// import CombinedImages from "./CombinedImages";
// import ClientImage from "./ClientImage";

// const WrapperImages = async (props: TNextImageProps) => {
//   try {
//     const blurDataURL = await generateBlurDataUrl(
//       props?.src,
//       !!props?.externalUrl,
//     );

//     return <CombinedImages {...props} blurDataURL={blurDataURL} />;
//   } catch (error) {
//     return <ClientImage {...props} />;
//   }
// };

// export default WrapperImages;
