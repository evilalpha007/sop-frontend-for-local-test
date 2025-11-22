// "use client"
// import React, { useState } from "react";
// import { useSpring, animated } from "react-spring";
// import { useGesture } from "@use-gesture/react";

// const items = [
//   <div className="h-[50dvh] bg-green-500">
//     <h3 className="flex h-full items-center justify-center">1</h3>
//   </div>,
//   <div className="h-[50dvh] bg-green-500">
//     <h3 className="flex h-full items-center justify-center">2</h3>
//   </div>,
//   <div className="h-[50dvh] bg-green-500">
//     <h3 className="flex h-full items-center justify-center">3</h3>
//   </div>,
//   <div className="h-[50dvh] bg-green-500">
//     <h3 className="flex h-full items-center justify-center">4</h3>
//   </div>,
//   <div className="h-[50dvh] bg-green-500">
//     <h3 className="flex h-full items-center justify-center">5</h3>
//   </div>,
//   <div className="h-[50dvh] bg-green-500">
//     <h3 className="flex h-full items-center justify-center">6</h3>
//   </div>,
// ];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setAnimating] = useState(false);

//   const nextSlide = () => {
//     if (isAnimating) return;
//     setAnimating(true);
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//   };

//   const prevSlide = () => {
//     if (isAnimating) return;
//     setAnimating(true);
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + items.length) % items.length,
//     );
//   };

//   const transition = useSpring({
//     transform: `translateX(-${currentIndex * 100}%)`,
//     onRest: () => setAnimating(false),
//   });

//   const bind = useGesture({
//     onDrag: ({ direction: [xDir], distance, cancel }) => {
//       if (distance > 50) {
//         cancel();
//         if (xDir > 0) prevSlide();
//         else nextSlide();
//       }
//     },
//   });

//   return (
//     <div className="relative flex w-full items-center justify-center overflow-hidden">
//       <button
//         className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-2 text-white"
//         onClick={prevSlide}
//       >
//         {"<"}
//       </button>

//       <animated.div className="flex" style={transition} {...bind()}>
//         {items?.map((item, index) => (
//           <div
//             key={index}
//             className={`w-1/4 flex-shrink-0 transition-transform duration-500 ${
//               index === currentIndex ||
//               index === (currentIndex + 1) % items.length
//                 ? "scale-100 opacity-100"
//                 : "scale-75 opacity-50"
//             }`}
//           >
//             {item}
//           </div>
//         ))}
//       </animated.div>

//       <button
//         className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-2 text-white"
//         onClick={nextSlide}
//       >
//         {">"}
//       </button>
//     </div>
//   );
// };

// export default Carousel;
