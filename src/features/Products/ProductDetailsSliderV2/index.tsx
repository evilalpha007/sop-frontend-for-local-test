// const ProductDetailsSliderV2 = () => {
//   return (
//     <>
//       <div className="flex w-full flex-col items-start gap-4 md:flex-row">
//         <div className="hidden h-full w-full items-center justify-between gap-2.5 md:flex-col lg:flex lg:w-1/5 2xl:gap-3">
//           {sliderData?.slice(0, 3)?.map((item, index) => (
//             <div
//               key={item.id}
//               className={`aspect-[17/13] h-full w-full cursor-pointer border ${currentIndex === index ? "border-theme-light-golden" : "border-theme-off-golden"}`}
//               onClick={() => handleThumbnailClick(index)}
//             >
//               <Image
//                 width={500}
//                 height={500}
//                 src={item.image}
//                 alt={`Thumbnail ${item?.id}`}
//                 className="aspect-[16/10] h-full w-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="flex w-full flex-1 flex-col gap-4 lg:w-4/5">
//           <div className="aspect-[16/10] w-full flex-grow">
//             <NextImage
//               width={500}
//               height={500}
//               src={sliderData?.[currentIndex]?.image ?? ""}
//               blurDataURL={sliderData?.[currentIndex]?.blurDataUrl}
//               alt={`Main Image ${sliderData?.[currentIndex]?.id}`}
//               className="aspect-[16/10] h-full w-full border border-theme-off-golden !object-cover"
//               imageClassName="!object-cover"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Thumbnails */}
//       <div className="mt-1 flex w-full justify-between gap-1 overflow-hidden lg:mt-4 lg:gap-4">
//         {bottomItems?.map((item, index) => (
//           <div
//             key={item.id}
//             className={`aspect-[16/12] h-full w-full cursor-pointer overflow-hidden border ${currentIndex === (isLargeScreen ? bottomStartIndex + index : index) ? "border-theme-light-golden" : "border-theme-off-golden"}`}
//             onClick={() =>
//               handleThumbnailClick(
//                 isLargeScreen ? bottomStartIndex + index : index,
//               )
//             }
//           >
//             <NextImage
//               width={200}
//               height={200}
//               src={item?.image}
//               blurDataURL={item?.blurDataUrl}
//               alt={`Thumbnail ${item.id}`}
//               className="h-full w-full !object-cover"
//               imageClassName="!object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ProductDetailsSliderV2;
