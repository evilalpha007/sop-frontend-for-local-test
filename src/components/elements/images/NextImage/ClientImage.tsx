// "use client";
// import { useState, useEffect } from "react";
// import CombinedImages from "./CombinedImages";
// import { TNextImageProps } from "./type";
// import { blurBgUrlFallback, generateBlurDataUrl } from "@/library/utils/image";

// const ClientImage = (props: TNextImageProps) => {
//   const [blurDataURL, setBlurDataURL] = useState(blurBgUrlFallback);

//   useEffect(() => {
//     const requestBlurUrl = async () => {
//       try {
//         const res = await generateBlurDataUrl(props?.src, !!props?.externalUrl);
//         setBlurDataURL(res);
//       } catch (error) {}
//     };
//     requestBlurUrl();
//   }, [props.src, props.externalUrl]);

//   return <CombinedImages {...props} blurDataURL={blurDataURL} />;
// };

// export default ClientImage;
