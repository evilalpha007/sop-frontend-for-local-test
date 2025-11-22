// "use client";
// import { cn } from "@/library/utils/cn";
// import { useState } from "react";
// import {
//   BsFillArrowRightCircleFill,
//   BsFillArrowLeftCircleFill,
// } from "react-icons/bs";

// const slides = [
//   "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
//   "https://wallpapercave.com/wp/wp3386769.jpg",
//   "https://wallpaperaccess.com/full/809523.jpg",
//   "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
// ];

// const CustomSlider = () => {
//   const [current, setCurrent] = useState(0);

//   const previousSlide = () => {
//     if (current === 0) setCurrent(slides.length - 1);
//     else setCurrent(current - 1);
//   };

//   const nextSlide = () => {
//     if (current === slides.length - 1) setCurrent(0);
//     else setCurrent(current + 1);
//   };

//   return (
//     <div className="relative overflow-hidden">
//       <div
//         className={`flex items-center transition duration-1000 ease-out`}
//         style={{
//           transform: `translateX(-${current * 15}%)`,
//         }}
//       >
//         {slides.map((s, i) => {
//           return (
//             <img
//               src={s}
//               key={i}
//               className={cn("mr-4",
//                 i === current+1 || i === current + 2 ? "w-[25%]" : "w-[15%]",
//               )}
//             />
//           );
//         })}
//       </div>

//       <div className="absolute top-0 flex h-full w-full items-center justify-between px-10 text-3xl text-white">
//         <button onClick={previousSlide}>
//           <BsFillArrowLeftCircleFill />
//         </button>
//         <button onClick={nextSlide}>
//           <BsFillArrowRightCircleFill />
//         </button>
//       </div>

//       <div className="absolute bottom-0 flex w-full justify-center gap-3 py-4">
//         {slides.map((s, i) => {
//           return (
//             <div
//               onClick={() => {
//                 setCurrent(i);
//               }}
//               key={"circle" + i}
//               className={`h-5 w-5 cursor-pointer rounded-full ${
//                 i == current ? "bg-white" : "bg-gray-500"
//               }`}
//             ></div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CustomSlider;
